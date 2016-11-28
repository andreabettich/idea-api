'use strict';

require('dotenv').config();

const Glue = require('glue');
const manifest = require('./config/server-manifest.json');

if (!process.env.PRODUCTION) {
    manifest.registrations.push({
        "plugin": {
            "register": "blipp",
            "options": {}
        }
    });
}

if (process.env.HAPI_HOST && process.env.HAPI_PORT) {
    manifest.connections[0].host = process.env.HAPI_HOST;
    manifest.connections[0].port = process.env.HAPI_PORT;
}

Glue.compose(manifest, {
    relativeTo: __dirname
}, (err, server) => {
    if (err) {
        console.log('server.register err:', err);
    }
    server.start(() => {
        console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
    });
});
