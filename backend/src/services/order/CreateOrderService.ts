import prismaClient from "../../prisma";

interface OrderRequest {
  table: number;
  name: string;
}

class CreateOrderService {
  async execute({ table, name }: OrderRequest) {
    let order = await prismaClient.order.create({
      data: {
        table: table, //mesa 
        name: name,
      },
    });
    return order;
  }
}

export default new CreateOrderService();
