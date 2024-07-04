import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class SendOrder {
  async execute({ order_id }: OrderRequest) {
    let order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        draft: false,
      },
    });
    return order;
  }
}

export default new SendOrder();
