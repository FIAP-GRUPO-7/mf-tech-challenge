# mf-tech-challenge
## 📦 Executar a Parte de Investimentos (Microfrontend)

A funcionalidade de **investimentos** é implementada como microfrontend e está no repositório separado:

Repositório: [https://github.com/FIAP-GRUPO-7/mf-tech-challenge](https://github.com/FIAP-GRUPO-7/mf-tech-challenge)

### Como Rodar Localmente os Microfrontends

1. Clone o repositório:

```bash
git clone https://github.com/FIAP-GRUPO-7/mf-tech-challenge.git
cd mf-tech-challenge
```

2. Instale as dependências em cada projeto:

```bash
cd shell && npm install
cd ../greetingcard && npm install
cd ../extractlist && npm install
cd ../sidebar && npm install
cd ../header && npm install
cd ../chart && npm install
```

3. Execute os microfrontends (em terminais separados):

```bash
cd shell && npm start
cd ../greetingcard && npm start 
cd ../extractlist && npm start
cd ../sidebar && npm start 
cd ../header && npm start 
cd ../chart && npm start 
```

Acesse: [http://localhost:9000](http://localhost:9000)
