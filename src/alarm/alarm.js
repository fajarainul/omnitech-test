import ReactNativeAN from 'react-native-alarm-notification';
import Moment from 'moment'

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
                hour = 24
            }
    
        }

        console.log('hour '+hour)

        if(hour != 0){
            var date = Moment(note.time).subtract(hour, 'hours').format("DD-MM-YYYY HH:mm:ss");
            console.log(date)
            const alarmNotifData = {
                title: note.title,
                message: note.desc,
                channel: "omnitech_test",
                small_icon: "ic_launcher",
                has_button : true,
                loop_sound : false,
                schedule_type : 'once',
                auto_cancel : true,
                fire_date : date
            };
        
            //Schedule Future Alarm
            const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData });
            result.push(alarm.id)
            console.log(alarm); // { id: 1 }
        
            //Send Local Notification Now
            ReactNativeAN.sendNotification(alarmNotifData);
        }

    }
    
    console.log('huwala '+result)

    return result;
}

async function removeAlarm(ids){
    console.log('ids')
    console.log(ids)
    for(var i=0;i<ids.length;i++){
        console.log(ids[i])
        ReactNativeAN.deleteAlarm(ids[i]);
    }
}