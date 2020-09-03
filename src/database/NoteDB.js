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
    
    let tb_note = await ExecuteQuery("CREATE TABLE IF NOT EXISTS tb_note (id	INTEGER NOT NULL UNIQUE, alarm_id INTEGER,title	TEXT, desc	TEXT, time	TEXT, attachment	TEXT, PRIMARY KEY(id AUTOINCREMENT))", []);
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

    //initiate tb user
    //check tb user
    let check_tb_user = await ExecuteQuery("SELECT * FROM tb_user;", []);
    if(check_tb_user.rows.length == 0 ){
        let insert_user = await ExecuteQuery("INSERT INTO tb_user (firstname, lastname, email, imageprofile, password, sex, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?)", ['fajar', 'ainul', 'fajar@email.com', null, 'password', 1, '1998-08-08'])
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
                'value' : intervals(i).id,
                'selected' : false
            }
        }
    }catch(er){
        console.log(er);
    }

    return result;

}

export async function addNote(note){
    var result = false;
    try{
        var alarmIds = '';
        for(var i=0;i<note.alarm_id.length;i++){
            alarmIds += note.alarm_id[i] + ",";
        }

        alarmIds = alarmIds.slice(0, -1);

        console.log(alarmIds)

        let insert_tb_note = await ExecuteQuery("INSERT INTO tb_note (title, desc, time, attachment, alarm_id) VALUES (?, ?, ?, ?, ?);",[note.title, note.desc, note.time, note.attachment, alarmIds]);
        let insertedId = insert_tb_note.insertId;

        var values = "";
        for(var i= 0; i<note.intervals.length;i++){
            var interval = note.intervals[i];
            if(interval.selected){
                values += "("+ insertedId +" , "+ interval.value +"),";
            }
        }

        values = values.slice(0, -1);

        if(values!==""){
             //insert into table note_interval
            let insert_note_interval = await ExecuteQuery("INSERT INTO tb_note_interval (id_note, id_interval) VALUES "+ values +";",[])

            if(insert_tb_note && insert_note_interval){
                result = true;
            }
        }else{
            if(insert_tb_note){
                result = true;
            } 
        }

    }catch(er){
        console.log(er);
    }

    return result;
}

export async function updateNote(note){
    var result = false;
    try{
        let update_tb_note = await ExecuteQuery("UPDATE tb_note SET title = ?, desc = ?, time = ?, attachment = ? WHERE id = ?;",[note.title, note.desc, note.time, note.attachment, note.id]);

        //delete data
        let delete_note_interval =  await ExecuteQuery("DELETE FROM tb_note_interval WHERE id_note=?;", [note.id]);
        
        var values = "";
        for(var i= 0; i<note.intervals.length;i++){
            var interval = note.intervals[i];
            if(interval.selected){
                values += "("+ note.id +" , "+ interval.value +"),";
            }
        }

        values = values.slice(0, -1);

        if(values!==""){
             //insert into table note_interval
            let update_note_interval = await ExecuteQuery("INSERT INTO tb_note_interval (id_note, id_interval) VALUES "+ values +";",[])

            if(update_tb_note && update_note_interval){
                result = true;
            }
        }else{
            if(update_tb_note){
                result = true;
            } 
        }

    }catch(er){
        console.log(er);
    }

    return result;
}


export async function getNotes(){
    var result = [];

    try{
        let notes_query = await ExecuteQuery("SELECT * FROM tb_note;",[]);
        
        var rows = notes_query.rows;
        for (let i = 0; i < rows.length; i++) {
            result[i] = rows.item(i);
        }

    }catch(er){
        console.log(er);
    }

    return result;

}

export async function getNote(id){
    var result = null;

    try{
        let note_query = await ExecuteQuery("SELECT * FROM tb_note WHERE id = ?;",[id]);
        
        let intervals_query = await ExecuteQuery("SELECT b.id, b.interval  FROM tb_note_interval a JOIN tb_interval b ON a.id_interval = b.id WHERE a.id_note = ?;",[id]);


        var rows = note_query.rows;

        if(rows.length > 0){
    
            result = rows.item(0);
        }

        var rowsIntervals = intervals_query.rows;
        var intervals = [];
        for (let i = 0; i < rowsIntervals.length; i++) {
            intervals[i] = rowsIntervals.item(i);
        }

        result['intervals'] = intervals;
    
    }catch(er){
        console.log(er);
    }

    return result;
}

export async function deleteNote(id){
    var result = false;
    try{
        let delete_query = await ExecuteQuery("DELETE FROM tb_note WHERE id=?;",[id]);
        
        if(delete_query){
            let delete_note_interval = await ExecuteQuery("DELETE FROM tb_note_interval WHERE id_note=?;",[id]);

            if(delete_query && delete_note_interval){
                result = true;
            }
        }

    }catch(er){
        console.log(er);
    }

    return result;

}


export async function loginUser(email, password){
    var result = null;

    var is_success = false;
    var message = 'User not found';
    var user_data = null;

    try{
        let login_query = await ExecuteQuery("SELECT * FROM tb_user WHERE email = ? AND password = ?;",[email, password]);
        
        var rows = login_query.rows;

        if(rows.length > 0){
            is_success = true;
            user_data = rows.item(0);
            message = '';
        }
    
    }catch(er){
        console.log(er);
    }

    result = {
        is_success,
        message,
        user_data
    }

    return result;
}

export async function updateUser(user){
    var result = false;
    try{
        let update_tb_user = await ExecuteQuery("UPDATE tb_user SET firstname = ?, lastname = ?, email = ?, birthdate = ?, imageprofile = ?, sex = ?, password = ? WHERE id = ?;",[user.firstname, user.lastname, user.email, user.birthdate, user.imageprofile, user.sex, user.password, user.id ]);
        console.log('try2')
        console.log(update_tb_user)
        if(update_tb_user){
            result = true;
        } 

    }catch(er){
        console.log(er);
    }

    return result;
}