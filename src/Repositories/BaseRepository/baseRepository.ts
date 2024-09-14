import prisma from "../../prismaClient";

class BaseRepository<T> {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  // Método genérico para criar um registro
  async create(data: T): Promise<T> {
    return await this.model.create({
      data,
    });
  }

  // Método genérico para deletar um registro
  async delete(id: string): Promise<T> {
    return await this.model.delete({
      where: { id },
    });
  }

  // Método genérico para atualizar um registro
  async update(id: string, data: Partial<T>): Promise<T> {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  // Método genérico para buscar por ID
  async findById(id: string): Promise<T | null> {
    return await this.model.findUnique({
      where: { id },
    });
  }

  // Método genérico para buscar todos os registros
  async findAll(): Promise<T[]> {
    return await this.model.findMany();
  }
}

export default BaseRepository;