# Backend

## Parancsok
```
npm init
npm i express cors mysql2
node --watch index.cjs
```

## Kezdet
```
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exhibitions'
});

conn.connect((error) => {
    if (error) console.warn('Error: ', error);
    else console.log('Succesfully connected to database: exhibitions.');
});

// TODO - app.get(); ...

app.listen(port, (error) => {
    if (error) console.warn('Error: ', error);
    else console.log('Express backend server is running on port:', port);
});
```

## Dátum
```
DATE_FORMAT(talalkozasok.date, '%Y-%m-%d %H:%i:%s') AS 'date'
```