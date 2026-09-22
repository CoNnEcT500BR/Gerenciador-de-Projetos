import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
}

export async function getUserByIdService(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user;
}

export async function updateUserService(userId: number, data: UpdateUserInput) {
  const current = await prisma.user.findUnique({ where: { id: userId } });
  if (!current) throw new Error('Usuário não encontrado');

  if (data.email && data.email !== current.email) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Email já está em uso');
  }
  if (data.password) {
    if (!data.currentPassword || !(await bcrypt.compare(data.currentPassword, current.password))) {
      throw new Error('Senha atual inválida');
    }
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.email !== undefined ? { email: data.email } : {}),
      ...(data.password ? { password: await bcrypt.hash(data.password, 10) } : {})
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
  return updated;
}
