import prismaClient from "../../prisma";

interface CategoryRequest {
  // solicitação de categoria
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === "") {
      throw new Error("Category Invalid");
    }

    let category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export default new CreateCategoryService();
