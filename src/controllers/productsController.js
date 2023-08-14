const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

/*const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");*/

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { products: products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let idProduct = req.params.id;
    let product = products.find((product) => product.id == idProduct);
    res.render("detail", { product: product });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form", { products: products });
  },

  // Create -  Method to store
  store: (req, res) => {
    const { name, price, image, description } = req.body;
    const lastProductId =
      products.length > 0 ? products[products.length - 1].id : 0;
    const newProductId = lastProductId + 1;
    const newProduct = {
      id: newProductId,
      name: name,
      price: parseFloat(price),
      image: image,
      description: description,
    };
    products.push(newProduct);
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(products, null, 2),
      "utf-8"
    );
    res.redirect("/products");
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
  },
};

module.exports = controller;
