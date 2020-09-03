import ReactNativeAN from 'react-native-alarm-notification';
import Moment from 'moment'
import { getNote } from '../database/NoteDB';

export async function setAlarm(note){
    console.log(note)
    //remove alarm if already set 
    await removeAlarm(note.alarm_id)

    var result = [];

    var length = note.intervals.length;
    for(var i=0;i<length;i++){
        var hour = 0;

        if(note.intervals[i].selected){
            if(note.intervals[i].value == 1){
                hour = 1
            }else if(note.intervals[i].value == 2){
                hour = 3
            }else if(note.intervals[i].value == 3){
                hour = 5
            }
    
        }

        if(hour != 0){
            var date = Moment(note.time).subtract(hour, 'minutes').format("DD-MM-YYYY HH:mm:ss");
            console.log(date)
            const alarmNotifData = {
                title: note.title,
                message: note.desc,
                channel: "my_channel_id",
                small_icon: "ic_launcher",
            };

            console.log(alarmNotifData)
        
            try{
                //Schedule Future Alarm
                const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: date });
                console.log(alarm)
            }catch(err){
                console.log(err)
            }
    
        }

    }

    return result;
}

async function removeAlarm(ids){
    for(var i=0;i<ids.length;i++){
        console.log(ids[i])
        ReactNativeAN.deleteAlarm(ids[i]);
    }
}


export async function removeAlarmByNoteId(id){
    let note = await getNote(id);
    var alarms = [];
    var alarm_id = ''
    if(note.alarm_id){
        if(note.alarm_id.charAt(note.alarm_id.length-1)== ','){
            alarm_id = note.alarm_id.slice(0, -1);
        }else{
            alarm_id = note.alarm_id;
        }

        if(alarm_id!=''){
            alarms = alarm_id.split(',').map(function(item) {
                return parseInt(item, 10);
            });
        }
    }

    await removeAlarm(alarms)

}