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

app.get('/api/cities', (req, res) => {
    const sqlQuery = `
        SELECT 
            id,
            name, 
            city,
            anchor,
            image
        FROM museums
        ORDER BY city ASC;
    `;

    conn.query(
        sqlQuery,
        (error, result) => {
            if (error) {
                console.warn(error);
                return res.status(500).json({
                    success: false,
                    error: 'Adatbázis lekérdezési hiba'
                });
            }

            if (result) {
                const data = [];
                const cities = [];

                result.forEach(museum => {
                    if (!cities.includes(museum.city)) cities.push(museum.city);
                });

                cities.forEach(city => {
                    let obj = {
                        city: city,    
                        museums: []
                    };

                    const museums = result.filter(element => element.city === city);
                    
                    museums.forEach(museum => {
                        obj = {
                            ...obj,
                            museums: [
                                ...obj.museums,
                                {
                                    id: museum.id,
                                    name: museum.name,
                                    anchor: museum.anchor,
                                    image: museum.image
                                }
                            ]
                        }
                    });

                    data.push(obj);
                });

                return res.status(200).json({
                    success: true,
                    data: [...data]
                });
            }
        }
    );
});

app.get('/api/cities/:id', (req, res) => {
    const id = Number(req.params?.id);

    if ( isNaN(id) || !id ) return res.status(400).json( {
        success: false,
        error: "Hiányzik az id vagy az érték nem szám"
    } ); 

    let sqlQuery = `
        SELECT 
            id,
            city
        FROM museums
        WHERE id = ?
        LIMIT 1;
    `;

    conn.query(
        sqlQuery,
        [id],
        (error, result) => {
            if (error) {
                console.warn(error);
                return res.status(500).json({
                    success: false,
                    error: 'Adatbázis lekérdezési hiba'
                });
            }

            if (result) {
                const city = result[0]?.city;

                if (!city) {
                    return res.status(404).json({
                        success: false,
                        error: 'A város nem található'
                    });
                }

                sqlQuery = `
                    SELECT
                        visit.id AS visit_id,
                        visit.name AS visit_name,
                        visit.description,
                        visit.visit_time,
                        museum.city,
                        museum.name AS museum_name,
                        museum.anchor AS museum_anchor,
                        museum.image AS museum_image,
                        type.name AS type_name
                    FROM visits AS visit
                    LEFT JOIN museums AS museum ON visit.museum_id = museum.id
                    LEFT JOIN types AS type ON visit.type_id = type.id
                    WHERE museum.city = ?;
                `;

                conn.query(
                    sqlQuery,
                    [city],
                    (error2, result2) => {
                        if (error2) {
                            console.warn(error2);
                            return res.status(500).json({
                                success: false,
                                error: 'Adatbázis lekérdezési hiba'
                            });
                        }

                        if (result2 && result2.length > 0) {
                            return res.status(200).json({
                                success: true,
                                city: city,
                                data: result2
                            });
                        } else {
                            return res.status(404).json({
                                success: false,
                                error: 'A város nem található'
                            });
                        }
                    }
                );
            }
        }
    );
});

app.get('/api/visits/search/:keyword', (req, res) => {

    const keyword = req.params?.keyword.trim();

    if (!keyword || keyword.length === 0) return res.status(400).json( {
        success: false,
        keyword: "nonexistent",
        message: 'Nincs találat a keresésre'
     } );
    
    const sqlQuery = `
        SELECT
            visit.id AS visit_id,
            visit.name AS visit_name,
            visit.description,
            visit.visit_time,
            museum.name AS museum_name,
            museum.city,
            museum.anchor AS museum_anchor,
            museum.image AS museum_image,
            type.name AS type_name
        FROM visits AS visit
        LEFT JOIN museums AS museum ON visit.museum_id = museum.id
        LEFT JOIN types AS type ON visit.type_id = type.id
        WHERE CONCAT(
            IFNULL(museum.name, ''), ' ',
            IFNULL(museum.city, ''), ' ',
            IFNULL(type.name, ''), ' ',
            IFNULL(visit.name, ''), ' '
        ) LIKE ?;
    `;

    conn.query(
        sqlQuery,
        [`%${keyword}%`],
        (error, result) => {
            if (error) {
                console.warn(error);
                return res.status(500).json({
                    success: false,
                    error: 'Adatbázis lekérdezési hiba'
                });
            }

            if (result && result.length > 0) {
                return res.status(200).json({
                    success: true,
                    keyword: keyword,
                    count: result.length,
                    data: result
                });
            } else {
                return res.status(404).json({
                    success: true,
                    keyword: keyword,
                    message: "Nincs találat a keresésre"
                });
            }
        }
    );
});

app.put('/api/visits/:id', (req, res) => {
    const id = Number(req.params?.id);

    if ( isNaN(id) || !id ) return res.status(400).json( {
        success: false,
        error: "Hiányzik az id vagy az érték nem szám"
    } ); 

    const visit_time = Number(req.body?.visit_time);

    if ( isNaN(visit_time) || !visit_time ) return res.status(400).json( {
        success: false,
        error: "Hiányzik a visit_time mező vagy az érték nem szám"
    } );

    let sqlQuery = `
        UPDATE visits SET visit_time = ?
        WHERE id = ?;
    `;

    conn.query(
        sqlQuery,
        [visit_time, id],
        (error, result) => {
            if (error) {
                console.warn(error);
                return res.status(500).json({
                    success: false,
                    error: 'Adatbázis hiba'
                });
            }

            if (result && result.changedRows !== 0) {
                sqlQuery = `
                    SELECT
                        visit.id AS id,
                        visit.name AS name,
                        visit.description,
                        visit.visit_time,
                        museum.id AS museum_id,
                        museum.name AS museum_name,
                        museum.city,
                        museum.anchor AS museum_anchor,
                        museum.image AS museum_image,
                        type.id AS type_id,
                        type.name AS type_name
                    FROM visits AS visit
                    LEFT JOIN museums AS museum ON visit.museum_id = museum.id
                    LEFT JOIN types AS type ON visit.type_id = type.id
                    WHERE visit.id = ?;
                `;

                conn.query(
                    sqlQuery,
                    [id],
                    (error2, result2) => {
                        if (error2) {
                            console.warn(error2);
                            return res.status(500).json({
                                success: false,
                                error: 'Adatbázis lekérdezési hiba'
                            });
                        }

                        if (result2 && result2.length !== 0) {
                            return res.status(200).json({
                                success: true,
                                message: "A látogatás időtartama sikeresen módosítva",
                                data: result2[0]
                            });
                        } else {
                            return res.status(404).json({
                                success: false,
                                message: "A látogatás nem található",
                            });
                        }
                    }
                );
            } else {
                return res.status(404).json({
                    success: false,
                    message: "A látogatás nem található",
                });
            }
        }
    );
});

app.post('/api/types', (req, res) => {
    const name = req.body?.name;

    if ( !name ) return res.status(400).json( {
        success: false,
        error: "Hiányzik a name mező vagy az érték nem string"
    } ); 

    let sqlQuery = `
        SELECT
            id,
            name
        FROM types
        WHERE name = ?;
    `;

    conn.query(
        sqlQuery,
        [name],
        (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    error: 'Adatbázis lekérdezési hiba'
                });
            }

            if (result.length > 0) {
                return res.status(409).json({
                    success: false,
                    error: 'Ez a típus már létezik'
                });
            } else {
                sqlQuery = `
                    INSERT INTO types (name) VALUES (?);
                `;
                
                conn.query(
                    sqlQuery,
                    [name, name],
                    (error, result) => {
                        if (error) {
                            console.warn(error);
                            return res.status(500).json({
                                success: false,
                                error: 'Adatbázis hiba'
                            });
                        }
                    
                        if (result && result?.insertId) {
                            const id = Number(result.insertId);
                        
                            sqlQuery = `
                                SELECT
                                    id,
                                    name
                                FROM types
                                WHERE id = ?;
                            `;
                        
                            conn.query(
                                sqlQuery,
                                [id],
                                (error2, result2) => {
                                    if (error2) {
                                        console.warn(error2);
                                        return res.status(500).json({
                                            success: false,
                                            error: 'Adatbázis lekérdezési hiba'
                                        });
                                    }
                                
                                    if (result2 && result2.length !== 0) {
                                        return res.status(201).json({
                                            success: true,
                                            message: "Új típus sikeresen létrehozva",
                                            data: result2[0]
                                        });
                                    } else {
                                        return res.status(404).json({
                                            success: false,
                                            error: 'Nem található adat'
                                        });
                                    }
                                }
                            );
                        } else {
                            return res.status(404).json({
                                success: false,
                                error: 'Nem található adat'
                            });
                        }
                    }
                );
            }
        }
    )
});

app.listen(port, (error) => {
    if (error) console.warn('Error: ', error);
    else console.log('Express backend server is running on port:', port);
});