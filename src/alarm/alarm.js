import ReactNativeAN from 'react-native-alarm-notification';
import Moment from 'moment'

export async function setAlarm(note){
    console.log(note)
    var result = [];

    var length = note.intervals.length;
    for(var i=0;i<length;i++){
        var hour = 0;

        if(note.intervals[i].value == 1){
            hour = 1
        }else if(note.intervals[i].value == 2){
            hour = 3
        }else if(note.intervals[i].value == 3){
            hour = 24
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
            result[i] = alarm.id;
            console.log(alarm); // { id: 1 }
        
            //Send Local Notification Now
            ReactNativeAN.sendNotification(alarmNotifData);
        }

    }
    
    console.log('huwala '+result)

    return result;
}