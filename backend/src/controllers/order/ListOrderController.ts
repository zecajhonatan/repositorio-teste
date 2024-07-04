import { Request, Response } from "express";
import ListOrderService from "../../services/order/ListOrderService";

class ListOrderController {
  async Handle(req: Request, res: Response) {
    let orders = await ListOrderService.execute();
    res.json(orders);
  }
}

export default new ListOrderController();
