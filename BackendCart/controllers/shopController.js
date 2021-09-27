const Product = require("../models/products");
const user = require("../models/user");
const Order = require("../models/order");

exports.getAllProducts = async (req, res, next) => {
  const output = await Product.find();
  res.send(output);
};

exports.getProduct = async (req, res, next) => {
  const output = await Product.findById(req.params.id);
  res.send(output);
};

exports.postCart = async (req, res, next) => {
  const postId = req.body.productId;
  Product.findById(postId).then((product) => {
    req.user.addToCart(product);
    res.send({
      result: "added succesfully",
    });
  });
};

exports.getCart = async (req, res, next) => {
  const cartItems = await req.user
    .populate("cart.items.productId")
    .execPopulate(); //populate doesn't returns a promise so we have to write execpopulate to make this statement return a promise
  res.send(cartItems);
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  await req.user.removeFromCart(prodId);
  res.send({ response: "Removed Successfully" });
};

exports.postOrder = async (req, res, next) => {
  const cartItems = await req.user
    .populate("cart.items.productId")
    .execPopulate();

  const products = cartItems.cart.items.map((ele) => {
    return { quantity: ele.quantity, productData: { ...ele.productId._doc } };
  });

  const order = new Order({
    user: {
      name: req.user.name,
      userId: req.user._id,
    },
    products: products,
  });

  await req.user.clearCart();

  await order.save();

  res.send({
    response: "Ordered Successfully",
  });
};

exports.getOrders = async (req, res, next) => {
  const Orders = await Order.find({ "user.userId": req.user._id });

  res.send(Orders);
};
