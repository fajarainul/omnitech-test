import { result } from "validate.js";

export const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
  });

export async function createTable() {
    console.log("CreateTable");
    
    let tb_note = await ExecuteQuery("CREATE TABLE IF NOT EXISTS tb_note (id	INTEGER NOT NULL UNIQUE, title	TEXT, desc	TEXT, time	TEXT, attachment	TEXT, PRIMARY KEY(id AUTOINCREMENT))", []);
    let tb_user = await ExecuteQuery("CREATE TABLE IF NOT EXISTS tb_user (id	INTEGER NOT NULL UNIQUE, firstname	TEXT, lastname	TEXT, email	TEXT, imageprofile	TEXT, password	TEXT, sex	INTEGER, birthdate	TEXT, PRIMARY KEY(id AUTOINCREMENT))", []);

    //create tb note interval
    let tb_note_interval = await ExecuteQuery("CREATE TABLE IF NOT EXISTS tb_note_interval (id	INTEGER NOT NULL UNIQUE, id_note INTEGER, id_interval INTEGER, PRIMARY KEY(id AUTOINCREMENT))", []);
    
    let check_interval = await ExecuteQuery("SELECT * from tb_interval;",[]);
    if(check_interval.rows.length != 3){
      //drop tb intervasl
      await ExecuteQuery("DROP TABLE IF EXISTS tb_interval", []);
      //create tb interval
      let tb_interval = await ExecuteQuery("CREATE TABLE IF NOT EXISTS tb_interval (id	INTEGER NOT NULL UNIQUE, interval	TEXT, PRIMARY KEY(id AUTOINCREMENT))", []);
      //init tb interval
      let init_tb_interval = await ExecuteQuery("INSERT INTO tb_interval (id, interval) VALUES (1, \"1 Hour\"), (2, \"3 Hours\"), (3, \"1 Day\");", []);
    }

}

export async function getIntervals(){

    var result = [];

    try{
        let intervalQuery = await ExecuteQuery("SELECT * from tb_interval;",[]);

        let length = intervalQuery.rows.length;

        let intervals = intervalQuery.rows.item;
        for(var i=0; i< length ; i++){

            result[i] = {
                'label' : intervals(i).interval,
                'value' : intervals(i).id
            }
        }
    }catch(er){
        console.log(er);
    }

    console.log(result);
    return result;

}

export async function addNote(note){
    console.log(note);
    var result = false;
    try{
        let insert_tb_note = await ExecuteQuery("INSERT INTO tb_note (title, desc, time, attachment) VALUES (?, ?, ?, ?);",[note.title, note.desc, note.time, note.attachment]);
        let insertedId = insert_tb_note.insertId;

        var values = "";
        for(var i= 0; i<note.intervals.length;i++){
            var interval = note.intervals[i];
            if(interval.selected){
                values += "("+ insertedId +" , "+ interval.value +"),";
            }
        }

        values = values.slice(0, -1);

        console.log(values);

        //insert into table note_interval
        let insert_note_interval = await ExecuteQuery("INSERT INTO tb_note_interval (id_note, id_interval) VALUES "+ values +";",[])

        console.log(insert_note_interval);

    }catch(er){
        console.log(er);
    }

    return result;
}