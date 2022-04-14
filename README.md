# Objective
Compare a thread-base vs event-base apps in term of performance for opening and closing http requests

# Server
The server is in nodejs. It throttles the requests based of the 'max' value
## Install / run
```
npm install
tsc server/server.ts # if you want to recompile it the JS
node server/server.js
```

# Clients
One implementation in JavaScript
## Run JS client
```
npm install
tsc client/client.ts # if you want to recompile it the JS
node client/client.js
```
One implementation in Python
## Run Python client
```
python client/client.py # Python 3
```

