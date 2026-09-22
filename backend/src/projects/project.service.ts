import prisma from '../prisma/client.js';
import { emitUserNotification, emitProjectEvent } from '../notifications/realtime.js';

interface ProjectInput {
  title: string;
  description?: string;
}

interface ProjectMemberInput {
  email: string;
  role?: string;
}

export async function getProjectsService(userId: number) {
  return prisma.project.findMany({
    where: {
      members: {
        some: { userId }
      }
    },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      },
      tasks: true
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getProjectByIdService(userId: number, projectId: number) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      members: {
        some: { userId }
      }
    },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      },
      tasks: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!project) {
    throw new Error('Projeto não encontrado');
  }

  return project;
}

export async function createProjectService(userId: number, data: ProjectInput) {
  return prisma.project.create({
    data: {
      title: data.title,
      description: data.description || '',
      members: {
        create: {
          userId,
          role: 'OWNER'
        }
      }
    },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      },
      tasks: true
    }
  });
}

export async function isProjectMemberService(userId: number, projectId: number) {
  const member = await prisma.projectMember.findUnique({
    where: {
      userId_projectId: { userId, projectId }
    }
  });

  return Boolean(member);
}

export async function getProjectMemberService(userId: number, projectId: number) {
  return prisma.projectMember.findUnique({
    where: { userId_projectId: { userId, projectId } }
  });
}

export async function updateProjectService(userId: number, projectId: number, data: ProjectInput) {
  const owner = await prisma.projectMember.findFirst({
    where: { userId, projectId, role: 'OWNER' }
  });

  if (!owner) throw new Error('Apenas o proprietário pode editar o projeto');

  return prisma.project.update({
    where: { id: projectId },
    data: { title: data.title, description: data.description ?? '' }
  });
}

export async function deleteProjectService(userId: number, projectId: number) {
  const owner = await prisma.projectMember.findFirst({
    where: { userId, projectId, role: 'OWNER' }
  });

  if (!owner) throw new Error('Apenas o proprietário pode excluir o projeto');

  return prisma.$transaction(async (transaction) => {
    await transaction.notification.deleteMany({ where: { projectId } });
    await transaction.message.deleteMany({ where: { projectId } });
    await transaction.task.deleteMany({ where: { projectId } });
    await transaction.projectMember.deleteMany({ where: { projectId } });
    return transaction.project.delete({ where: { id: projectId } });
  });
}

export async function addProjectMemberService(
  inviterId: number,
  projectId: number,
  data: ProjectMemberInput
) {
  const owner = await prisma.projectMember.findFirst({
    where: { userId: inviterId, projectId, role: 'OWNER' }
  });
  if (!owner) throw new Error('Apenas o proprietário pode gerenciar membros');

  const invitedUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (!invitedUser) throw new Error('Usuário não encontrado');

  const requestedRole = data.role ?? 'MEMBER';
  if (!['MEMBER', 'MANAGER'].includes(requestedRole)) {
    throw new Error('Papel de membro inválido');
  }
  const existing = await prisma.projectMember.findUnique({
    where: { userId_projectId: { userId: invitedUser.id, projectId } }
  });
  if (existing?.role === 'OWNER') {
    throw new Error('O proprietário não pode ter o papel alterado');
  }
  const member = await prisma.projectMember.upsert({
    where: { userId_projectId: { userId: invitedUser.id, projectId } },
    update: { role: requestedRole },
    create: { userId: invitedUser.id, projectId, role: requestedRole }
  });
  emitUserNotification(invitedUser.id, { projectId, content: `Você foi adicionado ao projeto ${projectId}.` });
  emitProjectEvent(projectId, 'memberAdded', { memberId: member.id, userId: invitedUser.id, role: member.role });

  await prisma.notification.create({
    data: {
      userId: invitedUser.id,
      projectId,
      content: `Você foi adicionado ao projeto ${projectId}.`
    }
  });

  return member;
}

export async function removeProjectMemberService(
  ownerId: number,
  projectId: number,
  memberId: number
) {
  const owner = await prisma.projectMember.findFirst({
    where: { userId: ownerId, projectId, role: 'OWNER' }
  });
  if (!owner) throw new Error('Apenas o proprietário pode gerenciar membros');
  if (owner.id === memberId) throw new Error('O proprietário não pode ser removido');

  const removed = await prisma.projectMember.delete({ where: { id: memberId } });
  emitUserNotification(removed.userId, { projectId, content: `Você foi removido do projeto ${projectId}.` });
  emitProjectEvent(projectId, 'memberRemoved', { memberId });
  return removed;
}
