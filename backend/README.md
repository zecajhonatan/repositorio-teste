criar uma pasta para envolver nosso projeto

### UTILIZANDO O GERENCIADOR DE PACOTES (YARN)

(yarn init -y) --> criar o arquivo package.json
(yarn add typescript -D) --> instalar o typescript em ambiente de desenvolvimento
(yarn add express) --> instala o pacote do express para trabalhar com as rotas
(yarn add @types/express) --> instala as tipagens do pacote, facilitar o uso com auto-complete
(yarn tsc --init) --> para inicializar o typescript no projeto
(yarn add ts-node-dev -D) --> responsavel por rodar o typescript, criando um script no package.json 



### UTILIZANDO O GERENCIADOR DE PACOTES (NPM)

npm install typescript -D --> instalar para ambiente de desenvolvimento

npm install express
npm install @types/express -D

iniciar o typescript no projeto
Comando --> tsc --init

rodar o typescript
e necessario uma biblioteca | ts-node-dev
// instalar em ambiente de desenvolvimento
comando --> npm add ts-node-dev -D

// biblioteca responsavel por tratar erros na aplicação
comando --> npm add express-async-errors

// aula de cors
https://www.youtube.com/watch?v=gOuJE6d_l-U&t=553s

// instalar o cors para permitir que qualquer pessoa possa fazer requisições na aplicação
comando --> npm install cors
comando --> npm install @types/cors -D --> ambiente de desenvolvimento

// entra no site do (postgresql) para baixar o banco de dados
// entra no site do (postbird) --> dashboard para manipular os dados dentro do postgresql
// baixar o beekeeper para trabalhar com os dados em uma interface

// utilizar o prisma para a conexão com a base de dados
instalar o prisma
comando --> npm install prisma
comando --> npm install @prisma/client
comando --> npx prisma init | inicializa o prisma com todas as suas configuraçãos

// criar uma migration na base de dados depois do schema ser criado
comando --> npx prisma migrate dev
