const express = require('express');
const PouchDB = require('pouchdb');

const app = express();
const port = 3000;
const db = new PouchDB('../db/estoqueLoja');

app.use(express.json());    


app.post('/products', async (req, res) => {
    const { name, price, stockQuantity, description, category } = req.body;
    if (!name || price < 0 || isNaN(price) || stockQuantity < 0 || isNaN(stockQuantity)) {
        res.status(400).send('Campos obrigatórios não preenchidos ou invalidos');
        return;
    }

    try {
        const product = {
            name,
            price,
            stockQuantity,
            description,
            category,
            createdAt: new Date().toLocaleDateString()
        };

        await db.post(product);
        res.status(201).send('Produto criado');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/products', async (req, res) => {
    const { category, minprice, maxprice } = req.query;
    let { limit, offset } = req.query;
    limit = parseInt(limit);
    offset = parseInt(offset);

    if (!limit || isNaN(limit) || limit < 0) {
        limit = 10;
    }

    if (!offset || isNaN(offset) || offset < 0) {
        offset = 0;
    }

    try {
        const result = await db.allDocs({
            include_docs: true,
            limit: limit,
            skip: offset
        });
        let products = result.rows.map(row => row.doc);

        if (category) {
            products = products.filter(product => product.category === category);
        }
        
        if (maxprice) {
            products = products.filter(product => product.price <= parseFloat(maxprice));
        }

        if (minprice) {
            products = products.filter(product => product.price >= parseFloat(minprice));
        }

        res.status(200).json({products});

    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const productfind = await db.get(id);
        if (productfind) {
            res.status(200).json(productfind);
        } else {
            res.status(404).send('Produto não encontrado');
        }

    } catch (err) {
        res.status(500);
    }
});

app.put('/products/:id', async (req, res) => {
    const { name, price, stockQuantity, description, category } = req.body;
    const { id } = req.params;

    if (!name || price < 0 || isNaN(price) || stockQuantity < 0 || isNaN(stockQuantity)) {
        res.status(400).send('Campos obrigatórios não preenchidos ou inválidos');
        return;
    }

    try {
        const productfind = await db.get(id);
        if (productfind) {
            const product = {
                _id: productfind._id,
                _rev: productfind._rev,
                name,
                price,
                stockQuantity,
                description,
                category
            };
            await db.put(product);
            res.status(200).send('Produto atualizado');
        } else {
            res.status(404).send('Produto não encontrado');
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const productfind = await db.get(id)

        if (productfind) {
            await db.remove(productfind);
            res.status(200).send('Produto deletado')
        }
        else {
            res.status(404).send('Produto não encontrado')
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


