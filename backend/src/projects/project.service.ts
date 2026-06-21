import prisma from '../prisma/client.js';

interface ProjectInput {
  title: string;
  description?: string;
}

export async function getProjectsService() {
  return prisma.project.findMany({
    include: {
      members: true,
      tasks: true
    }
  });
}

export async function createProjectService(data: ProjectInput) {
  return prisma.project.create({
    data: {
      title: data.title,
      description: data.description || ''
    }
  });
}
