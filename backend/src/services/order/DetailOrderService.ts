import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: OrderRequest) {
    let order = await prismaClient.item.findMany({ // encontre varios/muitos 
      where: {
        order_id: order_id,
      },
      include: {
        product: true,
        order: true,
      },
    });
    return order;
  }
}
export default new DetailOrderService();
