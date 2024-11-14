const express = require('express');
const app = express();
const {products} = require('./data');
const port = 3000;

app.use(express.static("./public"))
app.get('/api/v1/test', (req, res) => {
    res.status(200).json({ message: "It worked!" });
});

app.get('/api/products', (req, res) => {
   // res.json(products);
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image };
    })
    res.json(newProducts);
})

app.get('/api/v1/products/:productID', (req, res) => {
    const {productID} = req.params;
    const singleProduct = products.find(product=> product.id === Number(productID));
    if(!singleProduct) {
        return res.status(404).json({message: "That product was not found."});
    }
    return res.json(singleProduct);
})
app.get('/api/v1/query', (req, res) => {
    //console.log(req.query);
    const {search, limit, regexp, price} = req.query;
    let sortedProducts = [...products];
    if(search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (regexp) {
        const regex = new RegExp(regexp, 'i'); // 'i' flag for case-insensitive search
        sortedProducts = sortedProducts.filter((product) => {
            return regex.test(product.name);
        });
        res.status(200).json(sortedProducts);
    } else {
        return res.status(400).json({ success: false, message: "Invalid regexp pattern" });

    }
    if (price) {
        const priceLimit = Number(price); // Convert to number
        sortedProducts = sortedProducts.filter((product) => product.price < priceLimit);
        return res.status(200).json(sortedProducts);
        } else {
            return res.status(400).json({ success: false, message: "Invalid price format" });
        }

    if(limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if(sortedProducts.length < 1) {
        //  res.status(200).send('No product matched your search');
        return res.status(200).json({ sucess: true, data: [] })
    }
    res.status(200).json(sortedProducts);
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
