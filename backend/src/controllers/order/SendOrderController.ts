import { Request, Response } from "express";
import SendOrderService from "../../services/order/SendOrderService";

class SendOrderController {
  async Handle(req: Request, res: Response) {
    let { order_id } = req.body;
    let order = await SendOrderService.execute({ order_id });
    res.json(order);
  }
}

export default new SendOrderController();
