const express = require('express');
const line = require('@line/bot-sdk');
const request = require('request')
require('dotenv').config();
const app = express();
const {clientDB} = require('./connect')
const IDB = "INSERT INTO question (question) VALUES ($1)"
const SDB = "select * from question"
const data = {
    id: null
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

    let msg = {
        type: 'text',
        text: 'dffd'
    };

    let eventText = event.message.text.toLowerCase();

    if (eventText === 'ที่อยู่') {
        msg = {
            'type': 'text',
            text: 'ที่อยู่ของบริษัท\nถนนเพชรเกษม 68 แยก29 ถนนเพชรเกษม แขวงบางแคเหนือ เขตบางแค กรุงเทพมหานคร 10160\nhttps://www.google.com/maps?daddr=%E0%B9%80%E0%B8%AD.%E0%B9%80%E0%B8%84.%E0%B9%81%E0%B8%9E%E0%B8%84+%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%A5+80/150+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%A1+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87+%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%84+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%84+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10160&saddr=13.6884587,100.2712406&dirflg=d&ftid=0x30e297c41e814ed5:0x2fbaf8ab76baa52e&shorturl=1'
        }
    } else if (eventText === 'เบอร์ติดต่อ') {
        // console.dir();
        msg = {
            'type': 'text',
            text: 'เบอร์ติดต่อบริษัท\n028043352-4'
        }
    }  else if (eventText === 'ติดต่อฝ่ายการตลาด') {
        msg = {
            'type': 'text',
            text: 'เบอร์ติดต่อการตลาด\n-0816479494 คุณติ๋ม'

        }
    } 
    else if (eventText === 'อีเมล') {
        msg = {
            'type': 'text',
            text:'อีเมล์ของบริษัท\nakpack@hotmail.com'

        }
    } else if (eventText === 'แฟกซ์') {
        msg = {
            'type': 'text',
            text:'แฟกซ์ของบริษัท\n028043351'

        }
    } else if (eventText === 'สวัสดีครับ') {
        msg = {
            'type': 'text',
            text:'สวัสดี'
        }
    } else if (eventText === 'สวัสดีค่ะ') {
        msg = {
            'type': 'text',
            text:'สวัสดี'

        }
    } else if (eventText === 'สวัสดี') {
        msg = {
            'type': 'text',
            text:'สวัสดี'
        }
    } else if (eventText === 'ผลิตถุง') {
        msg = {
            'type': 'text',
            text: 'ทางบริษัทรับผลิตถุงประเภท ดังนี้\n- ถุงซิป\n- ถุงไฮเดน\n- ถุง PE\n- ถุง PP'

        }
    }
    else if (eventText === 'ขั้นต่ำในการสั่งผลิต') {
        msg = {
            'type': 'text',
            text: 'ทางบริษัทรับยอดขั้นต่ำในการสั่งผลิตสินค้า เริ่มที่ 200 กิโลกรัม',

        }
    }else if (eventText === 'เว็บไซต์') {
        msg = {
            'type': 'text',
            text: 'เว็บไซต์ของบริษัท\nhttp://www.industry.co.th/t1/facility.php?uid=37053'

        }
    }
    else if (eventText === 'report') {


        let result = []
        clientDB.query(SDB,(err, resDB) => {
           
           
           if (err) throw err;
           for (let row of resDB.rows) {
            result.push(row)
             console.log(JSON.stringify(row));
           }
           data.id=JSON.stringify(result)
           console.log(`this is = ${result}`);
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

        msg={
            'type':'text',
            'text':data.id
        }
        
     } 
   
    else {
        
        msg = {
            type: 'text',
            text: 'บอทสามารถตอบคำถามเกี่ยวกับ\n1.เบอร์ติดต่อ\n2.ติดต่อฝ่ายการตลาด\n3.ประเภทของถุงพลาสติก\n4.ขั้นต่ำในการสั่งผลิต\n5.ติดต่อฝ่ายการตลาด\n6.ที่อยู่\n7.อีเมล\n8.แฟกซ์\nของบริษัท เอ.เค.แพคและจักรกล จำกัด'
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
      
    }

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});