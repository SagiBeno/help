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
```

```
app.listen(port, (error) => {
    if (error) console.warn('Error: ', error);
    else console.log('Express backend server is running on port:', port);
});
```

## Dátum
```
DATE_FORMAT(talalkozasok.date, '%Y-%m-%d %H:%i:%s') AS 'date'
```

## PUT segédlet
```
app.put('/api/ember', (req, res) => {
    const { id, gender, name, image } = req.body;
    const emberId = Number(id);

    if ( isNaN(emberId) || !id ) return res.status(400).json( { message: `Helytelen személy ID!` } ); 

    const fields = [];
    const values = [];

    if (name) {
        fields.push("name = ?");
        values.push(name);
    }

    if (gender) {
        if (gender !== "boy" || gender !== "girl")  if ( isNaN(emberId) || !id ) return res.status(400).json( { message: `Helytelen nem!` } ); 
        fields.push("gender = ?");
        values.push(gender);
    }

    if (image) {
        fields.push("image = ?");
        values.push(image);
    }

    if (fields.length === 0 || values.length === 0) return res.status(400).json( { message: `Nincsenek adatok!` } ); 

    values.push(emberId);

    const sqlQuery = `
        UPDATE emberek SET ${fields.join(', ')}
        WHERE id = ?;
    `;

    conn.query(
        sqlQuery,
        values,
        (error, result) => {
            if (error) return res.status(500).json(error);
            if (result.changedRows === 0) return res.status(404).json({ message: 'Nem történt módosulás.', affectedRows: result.changedRows });
            
            conn.query(`
                    SELECT
                        id,
                        name,
                        gender,
                        image
                    FROM emberek
                    WHERE id = ?
                    LIMIT 1;
                `,
                [emberId],
                (personError, personResult) => {
                    if (personError) return res.status(500).json(personError);
                    if (result) {
                        return res.status(200).json({
                            message: 'A személy adatai sikeresen frissítve.',
                            affectedRows: result.changedRows,
                            person: {...personResult[0]}
                        });
                    }
                }
            );
        
        }
    );
});
```

## POST segédlet
```
app.post('/api/talalkozas', (req, res) => {
    const { locsolo_id, locsolt_id, kolni_id, vers_id, date } = req.body;

    if (!locsolo_id || !locsolt_id) return res.status(400).json({ message: 'Hiányzó kötelező adatok.' });

    let insertSql = '';
    let values = [];

    if (date) {
        insertSql = `
            INSERT INTO talalkozasok (locsolo_id, locsolt_id, kolni_id, vers_id, date)
            VALUES (?, ?, ?, ?, ?);
        `;
        values = [locsolo_id, locsolt_id, kolni_id || null, vers_id || null, date];
    } else {
        insertSql = `
            INSERT INTO talalkozasok (locsolo_id, locsolt_id, kolni_id, vers_id)
            VALUES (?, ?, ?, ?);
        `;
        values = [locsolo_id, locsolt_id, kolni_id || null, vers_id || null];
    }

    conn.query(
        insertSql,
        values,
        (error, result) => {
            if (error) return res.status(500).json(error);

            if (result) {
                const insertedId = result.insertId;

                const selectSql = `
                    SELECT
	                    locsolo.id AS 'locsolo_id',
                        locsolo.name AS 'locsolo_name',
                        locsolo.gender AS 'locsolo_gender',
                        locsolo.image AS 'locsolo_image',

                        locsolt.id AS 'locsolt_id',
                        locsolt.name AS 'locsolt_name',
                        locsolt.gender AS 'locsolt_gender',
                        locsolt.image AS 'locsolt_image',

                        kolnik.id AS 'kolni_id',
                        kolnik.name AS 'kolni_name',
                        kolnik.image AS 'kolni_image',

                        versek.id AS 'vers_id',
                        versek.title AS 'vers_title',
                        versek.text AS 'vers_text',

                        DATE_FORMAT(talalkozasok.date, '%Y-%m-%d %H:%i:%s') AS 'date'
                    FROM talalkozasok

                    JOIN emberek AS locsolo ON locsolo.id = talalkozasok.locsolo_id
                    JOIN emberek AS locsolt ON locsolt.id = talalkozasok.locsolt_id
                    LEFT JOIN kolnik ON kolnik.id = talalkozasok.kolni_id
                    LEFT JOIN versek ON versek.id = talalkozasok.vers_id

                    WHERE
                        locsolo.id = ? AND
                        locsolt.id = ?
                    
                    ORDER BY talalkozasok.date DESC
                    LIMIT 1;
                `;

                conn.query(
                    selectSql,
                    [locsolo_id, locsolt_id],
                    (error, rows) => {
                        if (error) return res.status(500).json(error);
                        console.log(locsolo_id, locsolt_id)
                        return res.status(201).json({
                            message: 'Új locsolási találkozás rögzítve.',
                            meeting: rows[0]
                        });
                    }
                );
            }
        }
    );
});
```