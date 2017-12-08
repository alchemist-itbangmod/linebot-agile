const line = require('@line/bot-sdk')
const express = require('express')

// create LINE SDK config from env variables
const config = {
  channelAccessToken: '3Rs1Noy94KmJ0dM9zs+3mksgZjDl6jCIjpwRlQ2WtwL9I3snNzNy0l2mq+EIJ8TtMczoocQNlmIA55ZgaRwkJX5AuctxrsnbDcbUenivetzgOr5frzACT7y9bIZXzcZdm60cdjfyjN4sKhvx6WeS5wdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd60e4299ad4f5d253babc9d91e649300'
}

// create LINE SDK client
const client = new line.Client(config)

// create Express app
// about Express itself: https://expressjs.com/
const app = express()

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result))
})

// event handler
function handleEvent (event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null)
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text }

  // use reply API
  return client.replyMessage(event.replyToken, echo)
}

// listen on port
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
