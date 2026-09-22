import prisma from '../prisma/client.js';

interface TaskInput {
  title: string;
  description?: string;
  status?: string;
  projectId: number;
}

export async function getTasksService(projectId: number) {
  return prisma.task.findMany({
    where: { projectId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function createTaskService(data: TaskInput) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description || '',
      status: data.status || 'PENDING',
      project: {
        connect: { id: data.projectId }
      }
    }
  });
}

export async function updateTaskStatusService(taskId: number, status: string) {
  return prisma.task.update({
    where: { id: taskId },
    data: { status }
  });
}

export async function updateTaskService(taskId: number, data: Partial<TaskInput>) {
  return prisma.task.update({
    where: { id: taskId },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.status !== undefined ? { status: data.status } : {})
    }
  });
}

export async function deleteTaskService(taskId: number) {
  return prisma.task.delete({ where: { id: taskId } });
}

export async function getTaskProjectIdService(taskId: number) {
  const task = await prisma.task.findUnique({ where: { id: taskId }, select: { projectId: true } });
  return task?.projectId;
}
