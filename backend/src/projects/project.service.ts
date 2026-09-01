import prisma from '../prisma/client.js';

interface ProjectInput {
  title: string;
  description?: string;
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
