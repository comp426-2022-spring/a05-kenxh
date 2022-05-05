const Database = require('better-sqlite3')

const db = new Database('./data/db/user.db')
//const stmt1 = db.prepare('DROP TABLE accesslog');

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`)
let row = stmt.get();
if (row === undefined) {
    console.log('Log database appears to be empty. Creating log database...')

    const sqlInit = `
        CREATE TABLE userinfo (
            id INTEGER PRIMARY KEY,
            username TEXT,
            password TEXT);
    `;

    db.exec(sqlInit);

    console.log('Your database has been initialized with a new table and two entries containing a username and password.')
} else {
    console.log('Database exists.')
}

module.exports = db