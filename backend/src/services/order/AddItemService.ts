import prismaClient from "../../prisma";

interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: ItemRequest) {
    let item = await prismaClient.item.create({
      data: {
        order_id: order_id,
        product_id: product_id,
        amount,
      },
    });
    return item;
  }
}

export default new AddItemService();
