const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
client.set("visits", 0);

app.get('/', (req, res) => {
    client.get("visits", (err, reply) => {
        res.send(`No. of visits = ${reply}`);
        client.set("visits", parseInt(reply) + 1);
    })
});

app.listen(8080, () => {
    console.log('App server started');
})