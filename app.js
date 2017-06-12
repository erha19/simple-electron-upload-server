// 'use strict';
// const fs = require('fs');
// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(require('morgan')('dev'));
// console.log(path.join(__dirname, '/releases'))
// app.use(express.static(path.join(__dirname, 'releases')));

// // app.get('/updates/latest', (req, res) => {
// //     const latest = getLatestRelease();
// //     const clientVersion = req.query.v;

// //     if (clientVersion === latest) {
// //         res.status(204).end();
// //     } else {
// //         res.json({
// //             url: `${getBaseUrl()}/releases/darwin/${latest}/MyApp.zip`
// //         });
// //     }
// // });

// let getLatestRelease = () => {
//     const dir = `${__dirname}/releases/darwin`;

//     const versionsDesc = fs.readdirSync(dir).filter((file) => {
//         const filePath = path.join(dir, file);
//         return fs.statSync(filePath).isDirectory();
//     }).reverse();

//     return versionsDesc[0];
// }

// let getBaseUrl = () => {
//     if (process.env.NODE_ENV === 'development') {
//         return 'http://localhost:3000';
//     } else {
//         return 'http://download.mydomain.com'
//     }
// }

// app.listen(process.env.PORT, () => {
//     console.log(`Express server listening on port ${process.env.PORT}`);
// });
const express = require('express');
const path = require('path');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('./private.pem', 'utf8');
var certificate = fs.readFileSync('./file.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 3000;
var SSLPORT = 80;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// Welcome
// app.get('/', function(req, res) {
//     if (req.protocol === 'https') {
//         res.status(200).send('Welcome to Safety Land!');
//     } else {
//         res.status(200).send('Welcome!');
//     }
// });
app.use(express.static(path.join(__dirname, 'releases')));