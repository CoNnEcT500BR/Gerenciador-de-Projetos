import prisma from '../prisma/client.js';

interface TaskInput {
  title: string;
  description?: string;
  status?: string;
  projectId: number;
}

export async function getTasksService() {
  return prisma.task.findMany();
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
