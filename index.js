const https = require('https');

module.exports = async (req, res) => {
  try {
    const path = req.url === '/' ? '' : req.url;
    const targetUrl = 'https://futebol7k.com/' + path;

    https.get(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'Referer': 'https://futebol7k.com/',
      }
    }, (resp) => {
      let data = '';

      resp.on('data', chunk => data += chunk);
      resp.on('end', () => {
        try {
          // Remove cabeçalhos que bloqueiam exibição
          const headers = { ...resp.headers };
          delete headers['x-frame-options'];
          delete headers['content-security-policy'];
https://futebol7k.com/
          // Reescrever URLs absolutas e relativas para seu domínio
          data = data
            .replace(/https:\/\/futebol7k\.com\//g, '/')
            .replace(/src="https:\/\/futebol7k\.com/([^"]+)"/g, 'src="/$1"')
            .replace(/src='https:\/\/futebol7k\.com\/([^']+)'/g, "src='/$1'")
            .replace(/href="https:\/\/futebol7k\.com\/([^"]+)"/g, 'href="/$1"')
            .replace(/href='https:\/\/futebol7k\.com\/([^']+)'/g, "href='/$1'")
            .replace(/action="https:\/\/futebol7k\.com\/([^"]+)"/g, 'action="/$1"')
            .replace(/url\(["']?https:\/\/futebol7k\.com\/(.*?)["']?\)/g, 'url("/$1")')
            .replace(/<iframe([^>]*)src=["']https:\/\/futebol7k\.com\/([^"']+)["']/g, '<iframe$1src="/$2"')
            .replace(/<base[^>]*>/gi, '');

          // Alterar título, remover ícone e inserir meta de verificação
          data = data
            .replace(/<title>[^<]*<\/title>/, '<title>Futebol ao Vivo</title>')
            .replace(/<link[^>]*rel=["']icon["'][^>]*>/gi, '')
            .replace(/<head>/i, `<head>\n<meta name="ppck-ver" content="82de547bce4b26acfb7d424fc45ca87d" />`);

          // **Remover todos os scripts (pop-ups e anúncios)**
          data = data.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

          // Injetar banner simples
          const banner = `
<div id="custom-footer">
<script type="text/javascript" src="//static.scptp9.com/mnpw3.js"></script>
<script>
mnpw.add('https://t.mbsrv2.com/273605/7566?popUnder=true&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0005&pud=scptp9', {
  newTab: true,
  cookieExpires: 86401
});
</script>
</div>
`;

          let finalHtml;
          if (data.includes('</body>')) {
            finalHtml = data.replace('</body>', `${banner}</body>`);
          } else {
            finalHtml = `${data}${banner}`;
          }

          res.writeHead(200, {
            ...headers,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': resp.headers['content-type'] || 'text/html'
          });

          res.end(finalHtml);

        } catch (err) {
          console.error("Erro ao processar HTML:", err);
          res.statusCode = 500;
          res.end("Erro ao processar o conteúdo.");
        }
      });
    }).on("error", (err) => {
      console.error("Erro ao buscar conteúdo:", err);
      res.statusCode = 500;
      res.end("Erro ao carregar conteúdo.");
    });

  } catch (err) {
    console.error("Erro geral:", err);
    res.statusCode = 500;
    res.end("Erro interno.");
  }
};
              
