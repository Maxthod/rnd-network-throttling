# Objective
Compare a thread-base vs event-base apps in term of performance for opening and closing http requests

# Requirements (AKA works with)
- Node 16
- Python 3

# Server
The server is in nodejs. It throttles the requests based of the 'max' value.

You can test a client by :
1) You make a POST to register your test
    ```
    url="/"
    json={
        id, # a unique id client side generated
        total # number of requests you plan to send
    }
    ```
2) You send GET requests until you reach your total
    ```
    url="/id"
    ```
3) You send a PUT to end your test. This will output the test results
    ```
    url="/"
    json={id}
    ```
    
## Install / run
```
npm install
tsc server/server.ts # if you want to recompile the JS
node server/server.js
```

# Clients

## JavaScript
```
npm install
tsc client/client.ts # if you want to recompile the JS
node client/client.js
```

## Python
```
python client/client.py # Python 3
```

# Results
## JS 
This took 5837ms for 1000 requests with delay 500ms. Theorical limit 5000. Performance 85%

## Python
This took 42418ms for 1000 requests with delay 500ms. Theorical limit 5000. Performance 11%