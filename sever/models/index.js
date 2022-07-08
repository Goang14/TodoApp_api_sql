const mysql = require('mysql');

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sinhvien',
        connectionLimit: 50,
        queueLimit: 0,
        waitForConnection: true
      })
      
      db.connect((err) => {
        if(err){
          console.log("connect that bai");
        }else
          console.log("connect thanh cong!!");
      })

module.exports = db;