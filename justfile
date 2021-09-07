mine:
  curl --request GET --url 'http://localhost:1984/mine'

chain:
  npx @textury/arlocal

up:
  yarn start

whale:
  docker run  --network="host" vikival/permafrost
