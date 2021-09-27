const {
  postAddProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productController");

const express = require("express");
const router = express.Router();

router.post("/add-product", postAddProduct);
router.patch("/edit-product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
