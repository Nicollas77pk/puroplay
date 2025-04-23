const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('URL obrigatória');

    request
        .get(url)
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Erro no proxy');
        })
        .pipe(res);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
