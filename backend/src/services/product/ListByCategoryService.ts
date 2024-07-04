import prismaClient from "../../prisma";

interface ProductRequest {
  category_id: string;
}

class ListByCategoryService {
  async execute({ category_id }: ProductRequest) {
    if (!category_id) {
      throw new Error("Invalid category add a Category!");
    }

    const findByCategory = await prismaClient.product.findMany({
      // encontrar por categoria
      where: {
        category_id: category_id,
      },
    });
    return findByCategory;
  }
}

export default new ListByCategoryService();
