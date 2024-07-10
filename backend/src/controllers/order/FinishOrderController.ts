import { Request, Response } from "express";
import FinishOrderService from "../../services/order/FinishOrder.Service";

class FinishOrderController {
  async Handle(req: Request, res: Response) {
    let order_id = req.body.order_id as string;
    let order = await FinishOrderService.execute({ order_id });
    res.json(order);
  }
}

export default new FinishOrderController();
