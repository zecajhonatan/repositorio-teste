import { Request, Response } from "express";
import RemoveItemService from "../../services/order/RemoveItemService";

class RemoveItemController {
  async Handle(req: Request, res: Response) {
    let item_id = req.query.item_id as string;
    let item = await RemoveItemService.execute({ item_id });
    res.json(item);
  }
}

export default new RemoveItemController();
