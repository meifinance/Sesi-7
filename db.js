const db = require('./conn');
var schemaName = 'sesi6';

add = async (data) => {
    try {
        const insertData = `INSERT INTO ${schemaName}.
        students (
            student_name, math, indonesian, natural_sciences, score, grade
        ) values (
            $1, $2, $3, $4, $5, $6
        ) returning *`;

        const values = [
            data.nama, data.matematika, data.bahasa_indonesia, data.ipa, 0, null
        ];

        const { rows } = await db.query(insertData, values);
        console.log(rows);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

read = async (data) => {
    try {
        const selectData = `SELECT * FROM ${schemaName}.students`;
        const { rows } = await db.query(selectData);
        return rows;
    } catch (error) {
        throw error;
    }
}

read_by_id = async (data) => {
    //const id = data
    try {
       const rows = await db.query(`SELECT * FROM ${schemaName}.students where student_id = $1`, [data]);
        return rows.rows;
    } catch (error) {
        throw error;
    }
}


read_by_name = async (data) => {
    //const id = data
    try {
       const rows = await db.query(`SELECT * FROM ${schemaName}.students where student_name = $1`, [data]);
        return rows.rows;
    } catch (error) {
        throw error;
    }
}



// update data
async function updateData() {
    await db.query(`update ${schemaName}.students set math = $2, indonesian = $3, natural_sciences = $4, score = $5, grade = $6 where student_name = $1`,
        ['Budi', 90, 90, 90, 1, 'A']
    );
}

// update nilai by student id
async function updateDataNilai(data1,data2,data3,id) {
    await db.query(`update ${schemaName}.students set math = $1, indonesian = $2, natural_sciences = $3 where student_id = $4 RETURNING *`, 
        [data1,data2,data3,id]
    );
}

async function Update_by_id(data1,data2,data3,id) {
    //const id = data
    try {
       const rows = await db.query(`update ${schemaName}.students set math = $1, indonesian = $2, natural_sciences = $3 where student_id = $4 RETURNING *`, 
       [data1,data2,data3,id]);
        return rows.rows;
    } catch (error) {
        throw error;
    }
}



//delete data
async function deleteData() {
    await db.query(`delete from ${schemaName}.students where student_name = $1`,
        ["Budi"]
    );
}

//delete data student id
async function deleteDataId(id) {
    await db.query(`delete from ${schemaName}.students where student_id = $1`,
        [id]
    );
}


module.exports = {
    add, read, updateData, deleteData, updateDataNilai, deleteDataId, Update_by_id
};