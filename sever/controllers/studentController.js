const db = require('../models/index')
class studentController {

    getall = async (req, res, next) => {
        let data = [];
        let total = 0
        let {page,limit} = req.query;
        let start = (page -1) * (limit)  || 0;

        let sql =`select count(*) as total from student`;
        await new Promise((resolve, reject) => {
            db.query(sql, (err, rows) =>{
                if(!err){
                    total = rows
                    resolve()
                } else{
                    reject(err)
                }
            });
        })
        sql = `select * from student limit ${start}, ${limit}`
        await new Promise((resolve, reject) => {
        db.query(sql, (err, rows) =>{
            if(!err){
                data = rows
                resolve()
            } else{
                reject(err)
            }
        });
        })
        return res.json({data, total});
    }


    create = async(req, res)=>{
        var params = req.body;
        var sql = `insert into student set name = '${params.name}', age = '${params.age}', address = '${params.address}'`;
        db.query(sql,(err, rows, fields) => {
            if(!err){
                db.query(`select * from student where id = ${rows.insertId}`,(err1, rows1)=>{
                    if(!err) return  res.json(rows1[0])
                    res.json({err1})
                })
            }else{
                res.json({err})
            }
        });
    }

    edit = async(req, res) => {
        var params = req.body;
        var id = req.params.id
        let sql = `update student set name = '${params.name}', age = '${params.age}', address = '${params.address}' where id =' ${id}'`;
        db.query(sql, (err) => {
             sql = `select * from student where id =${id}`;
             db.query(sql, (err, rows) => {
                if(!err) return  res.json(rows[0])
            })
            if(err) res.json(err);
        });

    }

    delete = async(req, res) => {
        var id = req.params.id
        let sql = `select * from student where id =${id}`;
        let data = null;
        db.query(sql, (err, rows) => {
            if(!err) data = rows[0];
        });

        sql = `Delete FROM student where id = '${id}'`;
        db.query(sql ,(err) => {
            if(!err)
                res.json(data)
            else 
                console.log(err)          
        });
    }
}

module.exports = new studentController;