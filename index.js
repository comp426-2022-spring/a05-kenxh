// Place your server entry point code here
const { exit } = require('process')
const args = require('minimist')(process.argv.slice(2), { 
    boolean: ['debug', 'log'],
    default: { debug: false, log: true }
})
args['port', 'debug', 'log']
const port = args.port || process.env.PORT || 5000
const debug = args.debug
const log = args.log

const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)

if (args.help) {
    console.log(help);
    exit(0);
}

const express = require('express')
const app = express() 

const logdb = require('./src/services/logdatabase')

const morgan = require('morgan')
const fs = require('fs')
const cors = require('cors')
const { getRoutes } = require('./src/routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))
app.use(cors())

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

app.use((req, res, next) => {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        secure: (req.secure) ? 1 : 0,
        status: req.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }
    
    const stmt = logdb.prepare('INSERT INTO accesslog (remote_addr, remote_user, time, method, url, protocol, http_version, secure, status, referer, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    stmt.run(Object.values(logdata)) 
    next()
})

app.use('/app', getRoutes())

app.get('/app/', (req, res) => {
    res.StatusCode = 200
    res.status(200).json({message: 'Your API works! (' + res.StatusCode + ')'})
})

if (log == true) { 
    const accessLog = fs.createWriteStream('./data/log/access.log', { flags: 'a' });
    app.use(morgan('combined', { stream: accessLog }));
}

if (debug) {
    app.get('/app/log/access', (req, res) => {
        try {
            const stmt = logdb.prepare('SELECT * FROM accesslog').all();
            res.status(200).json(stmt)
        } catch (e) {
            console.error(e)
        }
    });

    app.get('/app/error', (req, res) => {
        throw new Error("Error test successful.")
    });
}

