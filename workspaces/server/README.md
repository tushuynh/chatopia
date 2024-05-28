## Websockets server (Chat app)

Websockets server in [Nestjs](https://github.com/nestjs/nest) using socket.io

## Encrypt & Decrypt env files

Make sure to have HashiCorp Vault CLI installed, otherwise [install it here](https://developer.hashicorp.com/vault/tutorials/hcp-vault-secrets-get-started/hcp-vault-secrets-install-cli)

Preparation

```bash
$ vlt config
```

Encryption example

```bash
$ npm run enc chatopiaServer {ENV}
```

Decryption example

```bash
$ npm run dec chatopiaServer {ENV}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
