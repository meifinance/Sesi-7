const Fastify = require('fastify');
const { add, read, updateData, updateDataNilai, deleteDataId, Update_by_id } = require('./db')

const fastify = Fastify({
    logger: true,
    requestTimeout: 30000, // 30 Second
})

getRateSiswa = (nilaiMatematika, nilaiBahasaIndonesia, nilaiIPA) => {
    return (nilaiMatematika + nilaiBahasaIndonesia + nilaiIPA) / 3
}

checkRateSiswa = (rataRataNilai) => {
    if (rataRataNilai >= 80 && rataRataNilai <= 100) {
        return 'A';
    } else if (rataRataNilai >= 60 && rataRataNilai < 80) {
        return 'B';
    } else {
        return 'E';
    }
}

// fastify.route({
//     method: 'POST',
//     url: '/students',
//     handler: async (request, reply) => {
//         const dataSiswa = request.body.data;
//         try {
//             console.log(dataSiswa);
//             for (let index = 0; index < dataSiswa.length; index++) {
//                 const score = getRateSiswa(dataSiswa[index].matematika, dataSiswa[index].bahasa_indonesia, dataSiswa[index].ipa);
//                 const grade = checkRateSiswa(score);
//                 dataSiswa[index].score = score;
//                 dataSiswa[index].grade = grade;
//                 // console.log(dataSiswa[index]);
//                 const addStudent = await add(dataSiswa[index]);
//                 console.log('create student: ', addStudent);   
//             }
//             reply.send(
//                 {
//                     status: 'ok',
//                     data: []
//                 }
//             )
//         } catch (error) {
//             console.log('error create: ', error);
//         }
//     }
// })

// Tugas buat api menggunakan fastify:
// 1. Tarik semua data students & order berdasarkan created_date
// 2. tarik data students berdasarkan student_id (/:param)
// 3. tarik data students berdasarkan student_name (?queryParam)
// 4. update nilai matematika, bahasa indonesia & ipa students berdasarkan student_id
// 5. delete data berdasarkan student_id
// 6. push ke github


// 1. Tarik semua data students & order berdasarkan created_date
fastify.route({
    method: 'GET',
    url: '/students',
    handler: async (request, reply) => {
        //const dataSiswa = request.body.data;
        try {
            const students = await read();
       students.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
        reply.send(students);
        } catch (error) {
            console.log('error create: ', error);
        }
    }})


// 2. tarik data students berdasarkan student_id (/:param)
fastify.route({
    method: 'GET',
    url: '/students/:id',
    handler: async (request, reply) => {
        const idSiswa = request.params.id;
        try {
            const students = await read_by_id(idSiswa);
        reply.send(students);
        } catch (error) {
            console.log('error create: ', error);
        }
    }})


  // 3. tarik data students berdasarkan student_name (?queryParam)
  fastify.route({
    method: 'GET',
    url: '/studentName',
    handler: async (request, reply) => {
        const nameSiswa = request.query.student_name;
        try {
            const students = await read_by_name(nameSiswa);
        reply.send(students);
        } catch (error) {
            console.log('error create: ', error);
        }
    }})   


// 4. update nilai matematika, bahasa indonesia & ipa students berdasarkan student_id
fastify.route({
    method: 'PUT',
    url: '/students/:id',
    handler: async (request, reply) => {
        const idSiswa = request.params.id;
        const nilaiMatematika = request.body.math;
        const nilaiBahasaIndonesia = request.body.indonesian;
        const nilaiIPA = request.body.natural_sciences;
        console.log('haha: ',nilaiMatematika, nilaiBahasaIndonesia, nilaiIPA, idSiswa)
        try {
            const students = await Update_by_id(nilaiMatematika, nilaiBahasaIndonesia, nilaiIPA, idSiswa);
        reply.send(students);
        console.log(students);
        } catch (error) {
            console.log('error create: ', error);
        }
    }})  


// 5. delete data berdasarkan student_id
fastify.route({
    method: 'DELETE',
    url: '/students/:id',
    handler: async (request, reply) => {
        const idSiswa = request.params.id;
        try {
            const students = await deleteDataId(idSiswa);
        reply.send({students, status: 'ok'});
        } catch (error) {
            console.log('error create: ', error);
        }
    }})




const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start();

