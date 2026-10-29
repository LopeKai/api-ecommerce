# E-commerce API

Essa é uma API de e-commerce que eu construí com Node.js, Express e TypeScript, rodando no Firebase (Cloud Functions + Firestore).

A ideia é ter o back-end de uma loja online: dá pra cadastrar empresas, categorias e produtos, configurar formas de pagamento, gerenciar usuários e montar pedidos. Tem também autenticação com Firebase Auth, então boa parte das rotas só funciona com um token válido.

## 📄 Documentação

Todas as rotas estão documentadas com Swagger, e dá pra testar direto pelo navegador:

 **https://us-central1-ecommerce-api-two.cloudfunctions.net/api/docs/**

Para usar as rotas protegidas, faça login pela rota de autenticação, copie o token e cole no botão **Authorize** da documentação.

## 🛠️ O que foi usado

- Node.js + TypeScript
- Express
- Firebase Cloud Functions, Firestore e Firebase Auth
- Celebrate (Joi) para validação dos dados, incluindo CPF e CNPJ
- Swagger para a documentação

## ▶️ Rodando localmente

```bash
cd functions
npm install
npm run build
npm start
```

O `npm start` sobe o emulador do Firebase. Vai precisar ter o [Firebase CLI](https://firebase.google.com/docs/cli) instalado e configurado.
