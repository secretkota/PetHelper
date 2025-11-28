import db from "../helpers/db.js"



export const getCategories = (req, res) => {
    return new Promise ((resolve, reject) => {
        db.all("SELECT * FROM type_pet", (err, rows) => {
            if (err) return reject(err)
            resolve(rows)
        } )
    })
}

export const getAll= (userID) => {
    return new Promise ((resolve, reject) => {
        db.all("SELECT * FROM pet WHERE owner_id = ?", [userID], (err, row) => {
            if (err) return reject(err)
            resolve(row)
        })
    })
}

export const getByID = (id) => {
    return new Promise ((resolve, reject) => {
        db.get("SELECT * FROM pet WHERE id = ?", [id], (err, row) => {
            if (err) return reject(err)
            resolve(row)
        })
    })
}


export const create = (data) => {
    return new Promise ((resolve, reject) => {
        const { owner_id, name, type, breed, age, photo_path, desc} = data
        const stmt = "INSERT INTO pet (owner_id, name, type, breed, age, photo_path, desc) VALUES (?, ?, ?, ?, ?, ?)"

        db.run(stmt,  [owner_id, name, type, breed, age, photo_path, desc], function (err) {
            if (err) return reject(err)
            resolve({id: this.lastID})
        })
    })
}


export const update = (id, data) => {
    return new Promise((resolve, reject) => {
        const { name, type, breed, age, photo_path, desc } = data

        const stmt = `
            UPDATE pet
            SET name = ?, type = ?, breed = ?, age = ?, photo_path = ?, desc = ?
            WHERE id = ?
        `

        db.run(stmt, [name, type, breed, age, photo_path, desc, id], function(err) {
            if (err) return reject(err);
            
            if (this.changes === 0) {
                return resolve({ updated: false })
            }

            resolve({ updated: true })
        })
    })
}


export const remove = (id) => {
    return new Promise ((resolve, reject) => {
        const stmt = "DELETE FROM pet WHERE id = ?"

        db.run(stmt, [id], function(err) {
            if (err) return reject(err)
            resolve({ deleted: this.changes })
        })
    } )
}
