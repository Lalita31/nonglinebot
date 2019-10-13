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
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./demo1.sqlite", err => {
    console.log(err);
})
// console.log(MSG.data1)
//console.log(address.MSG);

const data = {
    id: null
}
app.get('/data', (req, res) => {
    db.all("SELECT * FROM question", [], (err, row) => {
        // console.dir(row);
        data.id = JSON.stringify(row)
        row.map((item) => { console.dir(item) })
    });
    res.setHeader('Content-Type', 'application/json');
  res.send(data.id)
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
            text: 'ถนนเพชรเกษม 68 แยก29 ถนนเพชรเกษม แขวงบางแคเหนือ เขตบางแค กรุงเทพมหานคร 10160'
        }
    } else if (eventText === 'เบอร์ติดต่อบริษัท') {
        // console.dir();
        msg = {
            'type': 'text',
            text: 028043352-4
        }
    }  else if (eventText === 'ติดต่อฝ่ายการตลาด') {
        msg = {
            'type': 'text',
            text: 0816479494 คุณติ๋ม

        }
    } else if (eventText === 'ที่อยู่อีเมลของบริษัท') {
        msg = {
            'type': 'text',
            text: akpack@hotmail.com

        }
    } else if (eventText === 'แฟกซ์ของบริษัท') {
        msg = {
            'type': 'text',
            text: 028043351

        }
    } else if (eventText === 'สวัสดีครับ') {
        msg = {
            'type': 'text',
            text: สวัสดี
        }
    } else if (eventText === 'สวัสดีค่ะ') {
        msg = {
            'type': 'text',
            text: สวัสดี

        }
    } else if (eventText === 'สวัสดี') {
        msg = {
            'type': 'text',
            text: สวัสดี
        }
    } else if (eventText === 'หวัดดี') {
        msg = {
            'type': 'text',
            text: สวัสดี

        }
    }
    else if (eventText === 'Facebook ของบริษัท') {
        msg = {
            'type': 'text',
            text: https://web.facebook.com/AK-Pack-and-Machinery-CoLtd-156593197861817/?hc_ref=ARTgW3JAvJwxE2lNLbF6W_oBTQXUC1soqCrIFfQCfCRoqcdLB7rnGXD1fJFFtDiSc8c&fref=nf&__xts__%5B0%5D=68.ARDbXcWfZYqoDgqf8gG9J2GCi1RQ1IIo5y4ifKGtJNbgYhfE7emTiCaXb-fqhd0SNP2jvqlVSqCwQPoO9bXmuhUkCjKfLlowITIgpGUARZKGYVVWXoAZMFsYY_rgq8hsxiUa_LT8CrzBv7SBp8_Y-v6DOpcIOAK1WsTugG1LZj-7xBwbTMx7bk6q5lpLw35ojaUroDs6T35a5XBfX7qXAEsTLLJbo7-dtv8SnvLbRtlJTsjcusy3xEJtjbRtalyOu-dbYG8GDkrpwg4pXDsX3sp-TeFJSC7atkYjkMKMMpbZo3RKnL8hRLxFKqe0fgqLYd7RSJbvuhknv99zqv7mJaQ&__tn__=kC-R&_rdc=1&_rdr',

        }
    }else if (eventText === 'เว็บไซต์ของบริษัท') {
        msg = {
            'type': 'text',
            text: http://www.industry.co.th/t1/facility.php?uid=37053

        }
    }else if (eventText === 'หวัดดี') {
        msg = {
            'type': 'สวัสดี',
            text: query.MSG

        }
    }else if (eventText === 'หวัดดี') {
        msg = {
            'type': 'สวัสดี',
            text: query.MSG

        }
    }
    else if (eventText === 'report') {


        db.all("SELECT * FROM question", [], (err, row) => {
            // console.dir(row);
            data.id = JSON.stringify(row)
            // row.map((item) => { console.dir(item) })
        });
        request({
            method: 'POST',
            uri: 'https://notify-api.line.me/api/notify',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                bearer: 'KkD5Q5KrOjTl9BcwQBxBstj4qZpo8bu0Kk6q9bAPJqv', //token
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
        
    } else if (eventText === 'ทุนวิจัย') {
        msg = {
            'type': 'text',
            text: capital.MSG

        }
    } else if (eventText === 'ขอรายละเอียดทุนวิจัย') {
        msg = {
            'type': 'text',
            text: capital.MSG1

        }
    } else if (eventText === 'ทุนวิจัย2564') {
        msg = {
            'type': 'text',
            text: capital.MSG2

        }
    } else if (eventText === 'ทุนวิจัย2563') {
        msg = {
            'type': 'text',
            text: capital.MSG3

        }
    } else if (eventText === 'เบิกเงินวิจัย') {
        msg = {
            'type': 'text',
            text: withdraw.MSG
        }
    } else if (eventText === 'ขอรายละเอียดเบิกเงินวิจัย') {
        msg = {
            'type': 'text',
            text: withdraw.MSG1

        }
    } else if (eventText === 'เบิกเงินงวดที่1') {
        msg = {
            'type': 'text',
            text: withdraw.MSG2

        }
    } else if (eventText === 'เบิกเงินงวดที่2') {
        msg = {
            'type': 'text',
            text: withdraw.MSG3

        }
    } else if (eventText === 'เบิกเงินงวดที่3') {
        msg = {
            'type': 'text',
            text: withdraw.MSG4

        }
    } else if (eventText === 'กองทุนสนับสนุนงานวิจัย') {
        msg = {
            'type': 'text',
            text: fund.MSG

        }
    } else if (eventText === 'คุยกับบอท') {
        msg = {
            'type': 'text',
            text: 'สวัสดีค่ะท่านสามารถสอบถามเกี่ยวกับ\n-ทุนวิจัย\n-เบิกเงินวิจัย\n-กองทุนสนับสนุนงานวิจัย\n-เอกสารดาวน์โหลด\n' +
                'ท่านสามารถดูรายละเอียดโดยการพิมพ์ขอรายละเอียดแต่ละหัวข้อกับน้องบอทได้ เช่น ทุนวิจัย เป็นต้น'

        }
    } else if (eventText === 'สามารถติดต่อได้ทางไหนบ้าง') {
        msg = {
            'type': 'text',
            text: 'สวัสดีค่ะท่านสามารถติดต่อ สถาบันวิจัยและพัฒนา มทร.รัตนโกสินทร์ ได้ตามช่องทางการติดต่อด้านล่างนี้\nFacebook : https://www.facebook.com/irdrmutr\nWebsite : https://ird.rmutr.ac.th\nEmail : ird.r@rmutr.ac.th , irdrmutr@hotmail.co.th\nสามารถติดต่อได้ที่ 02-441-6060 ต่อ 2420-2426'

        }
    } else if (eventText === 'เอกสารดาวน์โหลด') {
        msg = {
            'type': 'text',
            text: 'สวัสดีค่ะท่านสามารถดาวน์โหลดเอกสารต่างๆได้ในลิงค์ด้านล่างนี้\nhttps://ird.rmutr.ac.th/formdownload/ '

        }
    }  
    else {
        
        msg = {
            type: 'text',
            text: 'น้องบอทสามารถตอบคำถามเกี่ยวกับ\n-ทุนวิจัย\n-เบิกเงินวิจัย\n-กองทุนสนับสนุนงานวิจัย\n-เอกสารดาวน์โหลด'
        };
        if (eventText!== "hello, world" && eventText!== null) {
            db.all("INSERT INTO  question(question) VALUES(?)", [eventText], (err) => {
                if(err) console.dir(err.message);
    
            });
        }
      
    }

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});