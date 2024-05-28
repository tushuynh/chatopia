PROJECT_NAME=$1
APP_ENV=$2

PRIVATE_KEY=$(vlt secrets get --plaintext $PROJECT_NAME)
INPUT_FILE="./scripts/.env.${APP_ENV}.enc"
OUTPUT_FILE="./scripts/.env.${APP_ENV}"

openssl enc -d -aes-256-cbc \
  -pbkdf2 -iter 1000000 \
  -md sha512 -salt \
  -pass pass:$PRIVATE_KEY \
  -in env/.env.$APP_ENV.enc \
  -out env/.env.$APP_ENV
