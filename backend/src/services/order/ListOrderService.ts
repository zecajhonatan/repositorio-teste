import prismaClient from "../../prisma";

class ListOrder {
  async execute() {
    let orders = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return orders;
  }
}

export default new ListOrder();
