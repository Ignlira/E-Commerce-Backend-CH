const express = require('express');
const app = express();
const port = 8080;
const { getProducts, saveProducts } = require('./modules/products');
const { getCarts, saveCarts, createCart } = require('./modules/carts');
const { validateProductData } = require('./modules/utils');


app.use('/api/products', (req, res) => {
  switch (req.method) {
    case 'GET':
      getProducts()
        .then((products) => res.json(products))
        .catch((error) => res.status(500).json({ error }));
      break;
    case 'POST':
      const newProductData = req.body;
      const validationErrors = validateProductData(newProductData);

      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      
      getProducts()
        .then((products) => {
          products.push(newProductData);
          saveProducts(products);
          res.json(newProductData);
        })
        .catch((error) => res.status(500).json({ error }));
      break;

  }
});

app.use('/api/carts', (req, res) => {
  switch (req.method) {
    case 'GET':
      getCarts()
        .then((carts) => res.json(carts))
        .catch((error) => res.status(500).json({ error }));
      break;
    case 'POST':
      createCart()
        .then((newCart) => {
          getCarts()
            .then((carts) => {
              carts.push(newCart);
              saveCarts(carts);
              res.json(newCart);
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
      break;
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
