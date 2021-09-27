const Product = require("../models/products");

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const userId = req.user._id;

  const product = new Product({
    title,
    imageUrl,
    price,
    description,
    userId,
  });

  product
    .save()
    .then((ele) =>
      res.send({
        result: "Added Successfuly",
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

const editProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  for (var i in req.body) {
    if (req.body[i] != undefined) {
      product[i] = req.body[i];
    }
  }

  await product.save();

  res.send({
    result: "edited successfully",
  });
};

const deleteProduct = async (req, res, next) => {
  await Product.findByIdAndRemove(req.params.id);
  res.send({
    output: "Deleted Successfully",
  });
};

module.exports = { postAddProduct, editProduct, deleteProduct };
