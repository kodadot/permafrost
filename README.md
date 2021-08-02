# Permafrost

The smart NFT metadata storage forever.
________




## How does it work ?

Somewhere on this server there is stored wallet
All you need to do is just send your metadata, image and you are good to go.
 

We will have three methods 
 - [x] `/pin`
 - [ ] `/validate`
 - [ ] `/search`

## How to run? 

```bash
npm install
npm start
```
In the other terminal use 
[ArLocal](https://github.com/textury/arlocal)

## Is this method sustainable ? 

In v1 we are planning to add the JWT token which will be required in order to make a transaction

## Is there any catch? 

Yes, the current implementation of GraphQl does not allow `like` queries on the tags, only EQ and NEQ.
Unless this wont be resolved we need to make to make a server based workaround.
