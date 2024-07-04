import { Request, Response } from "express";
import RemoveOrderService from "../../services/order/RemoveOrderService";

class RemoveOrderController {
  async Handle(req: Request, res: Response) {
    let order_id = req.query.order_id as string;
    let order = await RemoveOrderService.execute({ order_id });
    res.json(order);
  }
}

export default new RemoveOrderController();
