import express from 'express';
import bodyParser from 'body-parser'

import todoRoutes from './routes/todos.js'

const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.get("/json-test", (req, res) => {
    res.send({message: "json test ok"})
});

app.use("/todos", todoRoutes)

app.listen(3009, () => {
    console.log("Server kuulab pordi 3009 peal")
})