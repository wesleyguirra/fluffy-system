# NodeJS RestFul API

## Dependências
Para rodar a aplicação será necessário ter instalado nodejs e o banco de dados mongoDB* 
> se estiver rodando no ubuntu ^16 instale o pacote nodejs-legacy `sudo apt-get install nodejs-legacy`

> *O mongoDB não precisa necessariamente estar instalado em sua máquina também pode ser utilizando um ambiente de teste online como o [mLab](https://www.mlab.com/home).

## Para testar:
* Clone ou baixe o repositório.
* Crie um arquivo .env seguindo o padrão no .env.example e substitua as variaveis de conexão com o MongoDB pelos seus dados de conexão;

```javascript
// exemplo de um arquivo .env
DB_URI='mongodb://<user>:<pass>@<host>:<port>/<db>'
// exemplo com variáveis reais
DB_URI='mongodb://fcamara:fcamara@ds119064.mlab.com:19064/heroku_ncsqlgm7'
```

* Navegue até a pasta do projeto e execute `npm install` para instalar as dependências locais do projeto;
* Ainda no terminal execute `npm run dev` ou `npm run production`: o primeiro script executa o nodemon que irá ficar observando alterações nos arquivos e irá reiniciar o servidor automaticamente, o segundo irá iniciar o servidor com o node;
```sh
$ cd api
$ npm install
$ npm run dev
```

Após configurado o banco rode o seed de usuários e produtos para popular o banco.
* Para rodar o seed e popular o banco de dados basta abrir as seguintes urls no navegador ou em uma ferramenta de chamadas em api: como o [Postman](https://www.getpostman.com/)
[http://localhost:3000/users/seed](http://localhost:3000/users/seed)
[http://localhost:3000/products/seed](http://localhost:3000/products/seed)

### Serão criados dois usuários:
| Usário | Senha |
| ------ | ------ |
| fcamara | fcamara |
| dev | dev@secret |

### E dois produtos
| Nome | Descrição | slug |
| ------ | ------ | ------ |
| Apple iPhone 7 | O iPhone 7 tem o melhor desempenho. | apple-iphone-7 |
| Google Pixel | the first phone with the Google Assistant built in. | google-pixel |

### A seguintes rotas estão disponíveis:
```sh
POST http://localhost:3000/auth #Autenticação/login
GET http://localhost:3000/products #Listagem de produtos *precisa logar
GET http://localhost:3000/products/seed #Popula o banco de dados com produtos
GET http://localhost:3000/users #Listagem de produtos *precisa logar
POST http://localhost:3000/users #Cria um novo usuário
GET http://localhost:3000/users/seed #Popula o banco de dados com usuários
```