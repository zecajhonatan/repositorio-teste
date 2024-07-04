import { Request, Response } from "express";
import DetailOrderService from "../../services/order/DetailOrderService";

class DetailOrderController {
  async Handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;
    const order = await DetailOrderService.execute({ order_id });
    res.json(order);
  }
}

export default new DetailOrderController();
