const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy para qualquer link do servidor HTTP
app.use('/proxy', createProxyMiddleware({
  target: 'http://lexus.hubns.top:80', // <- Altere aqui para o host que você quiser
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '', // remove "/proxy" do início da URL
  },
}));

// A porta é definida pela variável de ambiente no Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
