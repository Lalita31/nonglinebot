const express = require('express');
const line = require('@line/bot-sdk');
const request = require('request')
require('dotenv').config();
const app = express();
const {clientDB} = require('./connect')
const IDB = "INSERT INTO question (question) VALUES ($1)"
const SDB = "select * from question"
const data = {
    id: null,
    del:null
}
clientDB.connect()
app.get('/data', (req, res) => {
    let result = []
    clientDB.query(SDB,(err, resDB) => {
       result.push(resDB.rows)
       data.id=JSON.stringify(resDB.rows)
       if (err) throw err;
       for (let row of resDB.rows) {
           
         console.log(JSON.stringify(row));
       }
       res.status(200).json(result)
       console.log(`this is = ${result}`);
     });
})





const config = {
    channelAccessToken: 'i+FQrA9/mWO212NxzaPCsdzhANqlJlVa3luE2wWRjTMhcm+B/QYI0z/9Lv9HtZTH57Lkt2GF+N+xxuMTpYOm0LC4EXxFo2NxYNoaxOlAMSaAWyg+JVRY89/Oa2kAnptmVWxgWkukmYaF2jDSovrWzQdB04t89/1O/w1cDnyilFU=    ',
    channelSecret: '80ac4bb8bcb9d792e0c964af438170a1'
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {

  

    let eventText = event.message.text.toLowerCase();

    if (eventText === '5') {
       let msg = {
            'type': 'text',
            text: 'ที่อยู่ของบริษัท\nถนนเพชรเกษม 68 แยก29 ถนนเพชรเกษม แขวงบางแคเหนือ เขตบางแค กรุงเทพมหานคร 10160\nhttps://goo.gl/maps/udfaJQheXa7nHUFd8'
        }
       return client.replyMessage(event.replyToken, msg);
        
    } else if (eventText === '1') {
        // console.dir();
       let msg = {
            'type': 'text',
            text: 'เบอร์ติดต่อบริษัท\n028043352-4'
        }
       return client.replyMessage(event.replyToken, msg);
    }  else if (eventText === '2') {
       let msg = {
            'type': 'text',
            text: 'เบอร์ติดต่อการตลาด\n0816479494 คุณติ๋ม'
        }
       return client.replyMessage(event.replyToken, msg);
    } 
    else if (eventText === '6') {
       let msg = {
            'type': 'text',
            text:'อีเมล์ของบริษัท\nakpack@hotmail.com'
        }
       return client.replyMessage(event.replyToken, msg);
    } else if (eventText === '7') {
       let msg = {
            'type': 'text',
            text:'แฟกซ์ของบริษัท\n028043351'
        }
       return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สวัสดีครับ') {
       let msg = {
            'type': 'text',
            text:'สวัสดี'
        }
       return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สวัสดีค่ะ') {
       let msg = {
            'type': 'text',
            text:'สวัสดี'
        }
       return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สวัสดี') {
       let msg = {
            'type': 'text',
            text:'สวัสดี'
        }
       return client.replyMessage(event.replyToken, msg);
    } else if (eventText === '3') {
       let msg = {
            'type': 'text',
            text: 'ทางบริษัทรับผลิตถุงประเภท ดังนี้\n- ถุงซิป\n- ถุงไฮเดน\n- ถุง PE\n- ถุง PP'

        }
       return client.replyMessage(event.replyToken, msg);
    }
    else if (eventText === '4') {
       let msg = {
            'type': 'text',
            text: 'ทางบริษัทรับยอดขั้นต่ำในการสั่งผลิตสินค้า เริ่มที่ 200 กิโลกรัม',

        }
       return client.replyMessage(event.replyToken, msg);
    }else if (eventText === 'สินค้า') {
       let msg = {
            'type': 'text',
            text: 'รับผลิตถุงพลาสติก'

        }
       return client.replyMessage(event.replyToken, msg);
    }
    else if (eventText === 'reportdata') {
        let result = []
        clientDB.query(SDB,(err, resDB) => {
           
           
           if (err) throw err;
           for (let row of resDB.rows) {
            result.push(row)
             console.log(JSON.stringify(row));
           }
           data.id=JSON.stringify(result)
           console.log(`this is = ${result}`);
           let msg={
            'type':'text',
            'text':data.id
        }
        return client.replyMessage(event.replyToken, msg);
         });
        request({
            method: 'POST',
            uri: 'https://notify-api.line.me/api/notify',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                bearer: 'EsKzZjpWE7zu7uNgesFOfyeGks1FTZRx6ykhT4cMmrB', //token
            },
            form: {
                message: `this is eventext=${data.id}`, //ข้อความที่จะส่ง
            },
        }, (err, httpResponse, body) => {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        })

      
        
     }  else if (eventText.replace(/\s+/g, '').slice(0,6)==="delete") { 
   
        let delparams = eventText.slice(6, eventText.length);
      //  data.id=delparams
         clientDB.query("DELETE FROM question WHERE id=$1", [delparams],  (err, resDB)=>{
                if (err) throw err;
         else{
            if (resDB.rowCount) {
                  data.del="Delete success"
                  let msg = {
                   type: "text",
                   text: data.del
                 };
          
                 request(
                   {
                     method: "POST",
                     uri: "https://notify-api.line.me/api/notify",
                     header: {
                       "Content-Type": "application/x-www-form-urlencoded"
                     },
                     auth: {
                       bearer: "KkD5Q5KrOjTl9BcwQBxBstj4qZpo8bu0Kk6q9bAPJqv" //token
                     },
                     form: {
                       message: `this is eventext=${data.del}` //ข้อความที่จะส่ง
                     }
                   },
                   (err, httpResponse, body) => {
                     if (err) {
                       console.log(err);
                     } else {
                       console.log(body);
                     }
                   }
                 );
                  return client.replyMessage(event.replyToken, msg);
             }
            else{
                 data.del="Delete error"
                 let msg = {
                   type: "text",
                   text: data.del
                 };
               
                 request(
                   {
                     method: "POST",
                     uri: "https://notify-api.line.me/api/notify",
                     header: {
                       "Content-Type": "application/x-www-form-urlencoded"
                     },
                     auth: {
                       bearer: "KkD5Q5KrOjTl9BcwQBxBstj4qZpo8bu0Kk6q9bAPJqv" //token
                     },
                     form: {
                       message: `this is eventext=${data.del}` //ข้อความที่จะส่ง
                     }
                   },
                   (err, httpResponse, body) => {
                     if (err) {
                       console.log(err);
                     } else {
                       console.log(body);
                     }
                   }
                 );
                  return client.replyMessage(event.replyToken, msg);    
             }
        } 
          });
       }
   
    else {
        
       let msg = {
            type: 'text',
            text: 'บอทสามารถตอบคำถามเกี่ยวกับ\n1.เบอร์ติดต่อ\n2.ติดต่อฝ่ายการตลาด\n3.ประเภทของถุงพลาสติก\n4.ขั้นต่ำในการสั่งผลิต\n5.ที่อยู่\n6.อีเมล\n7.แฟกซ์\nของบริษัท เอ.เค.แพคและจักรกล จำกัด'
        };
      
        if (eventText!== "hello, world" && eventText!== null) {
            clientDB.query(IDB,[eventText],(err, resDB) => {
                if (err) throw err;
                for (let row of resDB.rows) {
                  console.log(JSON.stringify(row));
                }
              //  clientDB.end();
              });
        }
        return client.replyMessage(event.replyToken, msg);
    }
        
    
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});