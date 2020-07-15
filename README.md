# Controle de estoque de materiais de contrução

API responsável controlar um estoque de materiais de construção, permitindo o cadastro e edição de produtos e o registro de entrada e saída do estoque de produtos cadastrados.

## Execução

Há duas alternativas para execução do do projeto:

### Utilizando docker-compose

Utizando o docker-compose é possível fazer o deploy de todo o ambiente através do passos abaixo:
- Copiar o arquivo .env.sample para .env
- Executar o comando: 

    bash deploy.compose.bash

`Observação: É necessário parar o serviço mysql executado na máquina, para evitar conflito com o serviço iniciado pelo container da aplicação.`


### Executando Local
Para executar o projeto localmente, é necessário realizar os seguintes passos:
- Copiar o arquivo .env.sample para .env e substituir as variáveis de conexão com o banco de dados de acordo com as configurações do servidor mysql que será utilizado
- Instalar as dependências do projeto:
    
    ` Através do yarn`
    > yarn

    ` Através do npm`
    > npm install
- Executar o server:

    ` Através do yarn`
    > yarn start

    ` Através do npm`
    > npm run start

``` Observação: O ORM implementado na API irá gerar as tabelas/estruturas automaticamente na execução da API, porém é necessário que o banco de dados "vazio" já esteja criado previamente.```

## Utilização

Acessar a interface gráfica com todas as informações das rotas implementadas seus respectivos usos através do endpoint:
    
    /api-docs

## Testes
Para executar os testes unitários é necessário implementar os seguintes passos:
- Copiar o arquivo .env.sample para .env.test e substituir as variáveis de conexão com o banco de dados de acordo com as configurações do servidor mysql que será utilizado.

`!Observação importante: Não utilizar o mesmo banco de dados utilizado para execução da aplicação`


- Instalar as dependências do projeto:
    
    ` Através do yarn`
    > yarn

    ` Através do npm`
    > npm install

- Executar os testes:
    
    ` Através do yarn`
    > yarn test

    ` Através do npm`
    > npm run test
