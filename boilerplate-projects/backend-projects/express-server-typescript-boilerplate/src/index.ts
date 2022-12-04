import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import { join } from 'path'

import {
  SERVER_PORT,
  SERVER_BASE,
} from './configs/configs'

import homePageController from './pages/homepage/home-page-controller'

let server = express()

const jsonParser = bodyParser.json()
server.use(jsonParser)
server.use(express.json({ limit: '25mb' }));

const urlencodedParser = bodyParser.urlencoded({ extended: true })
server.use(urlencodedParser)
server.use(express.urlencoded({ limit: '25mb' }));

server.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4000'
  ]
}));

server.use('/pages', express.static(join(__dirname, '/pages/')))

server.get("/", homePageController);

server.get("*", (req, res) => {
  res.send("Error 404 - Page not found!")
});

server.listen(SERVER_PORT, async () => {
  console.log(`Server ${SERVER_BASE} iniciado na porta ${SERVER_PORT}`)
}).setTimeout(0)
