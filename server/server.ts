const express = require('express')
const app = express()
var bodyParser = require('body-parser');

const cache = {}
const port = 3000
const delay = 500
const pause = 5
const max = 100

app.use(bodyParser.json()); // support encoded bodies

const idFromReq = req => req.body.id

app.post('/', (req, res) => {
    const { id, total } = req.body
    cache[id] = {
        start: Date.now(),
        count: 0,
        current: 0,
        complete: 0,
        total
    }
    res.send(`registered by ${id}`)
})

app.get('/:id', (req, res) => {
    const { id } = req.params
    const c = cache[id]
    c.count = c.count + 1
    const throttle = (cb, nieme) => {
        if (c.current > max) {
            setTimeout(() => throttle(cb, nieme), pause)
        } else {
            cb()
        }
    }
    throttle(() => {
        c.current = c.current + 1
        setTimeout(() => {
            c.complete = c.complete + 1
            res.send(`Completed ${c.complete}/${c.total}`)
            c.current = c.current - 1
        }, delay)
    }, c.count)
})

app.put('/', (req, res) => {
    const { id } = req.body
    const {
        start, count
    } = cache[id]
    const took = Date.now() - start
    const limit = delay * count / max
    const perf = Math.floor(100 * limit / took)
    res.send(`This took ${took.toString()}ms for ${count} requests with delay ${delay}ms. Theorical limit ${limit}. Performance ${perf}%`)
    delete cache[id]
})

app.listen(port, () => {
    console.log(`Service is listening to ${port}`)
})