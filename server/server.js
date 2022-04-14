var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cache = {};
var port = 3000;
var delay = 500;
var pause = 5;
var max = 100;
app.use(bodyParser.json()); // support encoded bodies
var idFromReq = function (req) { return req.body.id; };
app.post('/', function (req, res) {
    var _a = req.body, id = _a.id, total = _a.total;
    cache[id] = {
        start: Date.now(),
        count: 0,
        current: 0,
        complete: 0,
        total: total
    };
    res.send("registered by ".concat(id));
});
app.get('/:id', function (req, res) {
    var id = req.params.id;
    var c = cache[id];
    c.count = c.count + 1;
    var throttle = function (cb, nieme) {
        if (c.current > max) {
            setTimeout(function () { return throttle(cb, nieme); }, pause);
        }
        else {
            cb();
        }
    };
    throttle(function () {
        c.current = c.current + 1;
        setTimeout(function () {
            c.complete = c.complete + 1;
            res.send("Completed ".concat(c.complete, "/").concat(c.total));
            c.current = c.current - 1;
        }, delay);
    }, c.count);
});
app.put('/', function (req, res) {
    var id = req.body.id;
    var _a = cache[id], start = _a.start, count = _a.count;
    var took = Date.now() - start;
    var limit = delay * count / max;
    var perf = Math.floor(100 * limit / took);
    res.send("This took ".concat(took.toString(), "ms for ").concat(count, " requests with delay ").concat(delay, "ms. Theorical limit ").concat(limit, ". Performance ").concat(perf, "%"));
    delete cache[id];
});
app.listen(port, function () {
    console.log("Service is listening to ".concat(port));
});
