const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
function getProducts() {
  return (products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")));
}

/*const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");*/

const controller = {
  // Root - Show all products
  index: (req, res) => {
    const products = getProducts();
    res.render("products", { products: products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    const products = getProducts();
    let idProduct = req.params.id;
    let product = products.find((product) => product.id == idProduct);
    res.render("detail", { product: product });
  },

  // Create - Form to create
  create: (req, res) => {
    const products = getProducts();
    res.render("product-create-form", { products: products });
  },

  // Create -  Method to store
  store: (req, res) => {
    const products = getProducts();
    const { name, price, description, discount, category } = req.body;
    const newProductId = products[products.length - 1].id + 1;
    const newProduct = {
      id: newProductId,
      name: name,
      price: parseFloat(price),
      image: req.file.filename,
      description: description,
      discount: discount,
      category: category,
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return res.redirect("/products");
  },

  // Update - Form to edit
  edit: (req, res) => {
    const products = getProducts();
    const id = req.params.id;
    const productToEdit = products.find((product) => product.id == id);
    res.render("product-edit-form", { productToEdit: productToEdit });
  },
  // Update - Method to update
  update: (req, res) => {
    const products = getProducts();
    const { name, price, description, discount, category } = req.body;
    const id = req.params.id;

    products.forEach((prod) => {
      if (prod.id == id) {
        prod.name = name !== "" ? name : prod.name;
        prod.price = parseFloat(price) !== "" ? parseFloat(price) : prod.price;
        prod.description = description !== "" ? description : prod.description;
        prod.discount = discount !== "" ? discount : prod.discount;
        prod.category = category !== "" ? category : prod.category;
      }
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect(`/products/`);
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const products = getProducts();

    const id = req.params.id;

    // Filtrar los productos para eliminar el producto con el ID especificado
    const updatedProducts = products.filter((prod) => prod.id != id);

    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(updatedProducts, null, 2)
    );
    res.redirect("/products");
  },
};

module.exports = controller;
