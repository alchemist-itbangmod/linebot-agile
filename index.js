const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: '3Rs1Noy94KmJ0dM9zs+3mksgZjDl6jCIjpwRlQ2WtwL9I3snNzNy0l2mq+EIJ8TtMczoocQNlmIA55ZgaRwkJX5AuctxrsnbDcbUenivetzgOr5frzACT7y9bIZXzcZdm60cdjfyjN4sKhvx6WeS5wdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd60e4299ad4f5d253babc9d91e649300'
}

const app = express()
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
})

const client = new line.Client(config)

const handleEvent = event => {
  if (event.type !== 'message' || event.message.type !== 'text')
    return Promise.resolve(null)
    
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  })
}

app.listen(3000, () => {
  console.log('server is running port 3000')
})