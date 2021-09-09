mine:
  curl --request GET --url 'http://localhost:1984/mine'

chain:
  npx @textury/arlocal

up:
  yarn start

build:
  docker build . -t vikival/permafrost

whale:
  docker run --rm -p 3003:3003 vikival/permafrost

sh:
  docker run -it  vikival/permafrost sh