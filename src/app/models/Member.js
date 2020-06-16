const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(
            `SELECT * 
            FROM  members`, function(err, results) {
                if(err) 
                throw `Database Error! ${err}`;

                callback(results.rows);
        }
    );
    },
    create(data, callback) {
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const value = [
            data.avatar_url,
            data.name,
            data.email,
            data(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
        ]

        db.query(query, values, function(err, results) {
            if(err) 
            throw `Database Error! ${err}`;

            callback (results.rows[0]);   
        }
    ); 
            
    },
    find(id, callback) {
        db.query (
            `
            SELECT *
            FROM member
            WHERE id = ${id}
            `, function(err, results) {
                if(err) 
                throw `Database Error! ${err}`;

                callback(results.rows[0]);
            }
        );
    },
    update(data, callback) {
        const query = 
        `
        UPDATE members
        SET
            avatar_url=($1),
            name=($2),
            email=($3),
            birth=($4),
            gender=($5),
            blood=($6),
            weight=($7),
            height=($8)
        WHERE id = $9
        `
        const value = [
            data.avatar_url,
            data.name,
            data.email,
            data(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.id
        ]

        db.query(query, value, 
            function(err, results) {
                if(err)
                throw `Database Error! ${err}`;

                callback();
            }
        );
    },
    delete(id, callback) {
        db.query (
            `
                DELETE FROM members 
                WHERE id = $1
            `, [id], function(err, results) {
                if(err)
                throw `Database Error! ${err}`;
                }
        );

        callback();
    },

};