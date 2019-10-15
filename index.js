const express = require('express');
const line = require('@line/bot-sdk');
const address = require('./address')
const query = require('./query')
const capital = require('./capital')
const withdraw = require('./withdraw')
const fund = require('./fund')
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
            text: 'ที่อยู่ของบริษัท\nถนนเพชรเกษม 68 แยก29 ถนนเพชรเกษม แขวงบางแคเหนือ เขตบางแค กรุงเทพมหานคร 10160'
        }
    } else if (eventText === 'เบอร์ติดต่อ') {
        // console.dir();
        msg = {
            'type': 'text',
            text: 'เบอร์ติดต่อบริษัท\n028043352-4'
        }
    }  else if (eventText === 'เบอร์ติดต่อการตลาด') {
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
    } else if (eventText === 'หวัดดี') {
        msg = {
            'type': 'text',
            text: สวัสดี

        }
    }
    else if (eventText === 'Facebook') {
        msg = {
            'type': 'text',
            text: 'Facebook ของบริษัท\nhttps://web.facebook.com/AK-Pack-and-Machinery-CoLtd-156593197861817/?hc_ref=ARTgW3JAvJwxE2lNLbF6W_oBTQXUC1soqCrIFfQCfCRoqcdLB7rnGXD1fJFFtDiSc8c&fref=nf&__xts__%5B0%5D=68.ARDbXcWfZYqoDgqf8gG9J2GCi1RQ1IIo5y4ifKGtJNbgYhfE7emTiCaXb-fqhd0SNP2jvqlVSqCwQPoO9bXmuhUkCjKfLlowITIgpGUARZKGYVVWXoAZMFsYY_rgq8hsxiUa_LT8CrzBv7SBp8_Y-v6DOpcIOAK1WsTugG1LZj-7xBwbTMx7bk6q5lpLw35ojaUroDs6T35a5XBfX7qXAEsTLLJbo7-dtv8SnvLbRtlJTsjcusy3xEJtjbRtalyOu-dbYG8GDkrpwg4pXDsX3sp-TeFJSC7atkYjkMKMMpbZo3RKnL8hRLxFKqe0fgqLYd7RSJbvuhknv99zqv7mJaQ&__tn__=kC-R&_rdc=1&_rdr',

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
            text: 'บอทสามารถตอบคำถามเกี่ยวกับ\n-ที่อยู่\n-เบอร์ติดต่อ\n-เบอร์ติดต่อการตลาด\n-อีเมล\n-แฟกซ์\n-Facebook\n-เว็บไซต์\nของบริษัท เอ.เค.แพคและจักรกล จำกัด'
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