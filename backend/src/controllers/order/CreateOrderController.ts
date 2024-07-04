import { Request, Response } from "express";
import CreateOrderService from "../../services/order/CreateOrderService";

class CreateOrderController {
  async Handle(req: Request, res: Response) {
    let { table, name } = req.body;
    let order = await CreateOrderService.execute({ table, name });
    return res.json(order);
  }
}

export default new CreateOrderController();
