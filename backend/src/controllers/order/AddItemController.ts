import { Request, Response } from "express";
import AddItemService from "../../services/order/AddItemService";
class AddItemController {
  async Handle(req: Request, res: Response) {
    let { order_id, product_id, amount } = req.body;
    let order = await AddItemService.execute({ order_id, product_id, amount });
    res.json(order);
  }
}
export default new AddItemController();
