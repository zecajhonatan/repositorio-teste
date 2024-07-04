import { Router } from "express";
import multer from "multer";

import CreateUserController from "./controllers/user/CreateUserController";
import AuthUserController from "./controllers/user/AuthUserControlle";
import DetailUserController from "./controllers/user/DetailUserController";
import CreateCategoryController from "./controllers/category/CreateCategoryController";
import ListCategoryController from "./controllers/category/ListCategoryController";
import CreateProductController from "./controllers/product/CreateProductController";
import ListByCategoryController from "./controllers/product/ListByCategoryController";
import CreateOrderController from "./controllers/order/CreateOrderController";
import RemoveOrderController from "./controllers/order/RemoveOrderController";
import AddItemController from "./controllers/order/AddItemController";
import RemoveItemController from "./controllers/order/RemoveItemController";
import SendOrderController from "./controllers/order/SendOrderController";
import ListOrderController from "./controllers/order/ListOrderController";
import DetailOrderController from "./controllers/order/DetailOrderController";
import FinishOrderController from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "../config/multer";

let router = Router();

let upload = multer(uploadConfig.update("./tmp"));

// -- ROTAS USER --
router.post("/users", CreateUserController.Handle); // cadastro
router.post("/session", AuthUserController.Handle); // login -- autenticação
router.get("/me", isAuthenticated, DetailUserController.Handle); // dados do usuario

// -- ROTAS CATEGORIES
router.post("/category", isAuthenticated, CreateCategoryController.Handle); // criar categoria
router.get("/listCategory", isAuthenticated, ListCategoryController.Handle); // listar categorias

// -- ROTAS PRODUCT
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  CreateProductController.Handle
);
router.get(
  "/category/product",
  isAuthenticated,
  ListByCategoryController.Handle
);

// -- ORDER
router.post("/order", isAuthenticated, CreateOrderController.Handle);
router.delete("/remove", isAuthenticated, RemoveOrderController.Handle);
router.post("/order/add", isAuthenticated, AddItemController.Handle);
router.delete("/order/remove", isAuthenticated, RemoveItemController.Handle);
router.put("/order/send", isAuthenticated, SendOrderController.Handle);
router.get("/orders", isAuthenticated, ListOrderController.Handle);
router.get("/order/detail", isAuthenticated, DetailOrderController.Handle);
router.put("/order/finish", isAuthenticated, FinishOrderController.Handle);

export { router };
