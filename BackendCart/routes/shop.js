const express = require("express");
const {
  getAllProducts,
  getProduct,
  postCart,
  getCart,
  postCartDeleteProduct,
  postOrder,
  getOrders,
} = require("../controllers/shopController");

const router = express.Router();

router.get("/all-products", getAllProducts);
router.get("/product/:id", getProduct);
router.post("/add-to-cart", postCart);
router.get("/get-cart", getCart);
router.delete("/cart-delete-item", postCartDeleteProduct);
router.post("/create-order", postOrder);
router.get("/get-orders", getOrders);

module.exports = router;
