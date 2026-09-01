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
