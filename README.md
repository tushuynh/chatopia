# Installation

```bash
$ npm i
```

# Client

## Description
Chat app with ReactJS

## Encryption & Decryption env files

Make sure to have HashiCorp Vault CLI installed, otherwise [install it here](https://developer.hashicorp.com/vault/tutorials/hcp-vault-secrets-get-started/hcp-vault-secrets-install-cli)

Preparation

```bash
$ vlt config
```

Encryption example

```bash
$ yarn enc:client chatopiaClient {ENV}
```

Decryption example

```bash
$ yarn dec:client chatopiaClient {ENV}
```

## Run app

```
$ npm start
```

---

# Server

## Description

Websockets server in [Nestjs](https://github.com/nestjs/nest) using socket.io

## Encrypt & Decrypt env files

Make sure to have HashiCorp Vault CLI installed, otherwise [install it here](https://developer.hashicorp.com/vault/tutorials/hcp-vault-secrets-get-started/hcp-vault-secrets-install-cli)

Preparation

```bash
$ vlt config
```

Encryption example

```bash
$ npm run enc:server chatopiaServer {ENV}
```

Decryption example

```bash
$ npm run dec:server chatopiaServer {ENV}
```

## Running the app

```bash
$ npm run dev
```
