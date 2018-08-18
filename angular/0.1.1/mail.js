var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})
var upload = multer({storage : storage})

console.log('Mail Query');

// 비동기로 전부 바꿔야 한다!!!!!!!!!!!!!!!!!!!

router.post('/sendMail', function(req, res, next){
    var filePath = './public/uploads/';
    var Transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth : {
            user : 'dltkddns833@gmail.com',
            pass : '!mufeat0815'
        }
    });
    var img_list = [
        img1 = req.body.img1,
        img2 = req.body.img2,
        img3 = req.body.img3,
        img4 = req.body.img4
    ]
    var data_list = fs.readdirSync('./public/uploads');
    var attch_list = [];

    for(var i = 0; i < data_list.length; i++){
        for(var j = 0; j < img_list.length; j++){
            if(img_list[j] == data_list[i]){
                attch_list.push(data_list[i]);
            }
        }
    }

    var mailOptions = {
        from : req.body.name + '<dltkddns833@gmail.com>',
        to: 'daydream_bubble@naver.com',
        subject : '체험단 신규 신청 : ' + req.body.mname,
        text : 'Mail Test name : ' + req.body.name + ' phone : ' + req.body.phone,
        attachments : [
            {
                filename: attch_list[0],
                path : filePath + attch_list[0]
            },
            {
                filename: attch_list[1],
                path : filePath + attch_list[1]
            },
            {
                filename: attch_list[2],
                path : filePath + attch_list[2]
            },
            {
                filename: attch_list[3],
                path : filePath + attch_list[3]
            },
        ]
    }


    Transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.send(400)
        }else {
            console.log('Email sent! : ' + info.response);
            for(var i = 0; i < attch_list.length; i++){
                fs.unlinkSync(filePath + attch_list[i]);
            }
            res.send(200);
        }
        Transporter.close();
        
    });
    
        
});

router.post('/sendImage', upload.array('imagefile', 4), function(req, res, next){
    res.send(200)
});

router.post('/deleteImage', function(req, res, next){
    var filePath = './public/uploads/';
    var filename = req.body.name;
    fs.unlinkSync(filePath + filename);
    res.send(200);
})

router.post('/deleteAll', function(req, res, next){
    var filePath = './public/uploads/';
    var data_list = fs.readdirSync('./public/uploads');
    var delete_list = [];
    var req_data = req.body.img

    for(var i = 0; i < req_data.length; i++){
        delete_list.push(req_data[i]);
    }

    if(delete_list.length > 0){

        for(var i = 0; i < data_list.length; i++){
            for(var j = 0; j < delete_list.length; j++){
                if(delete_list[j] == data_list[i]){
                    fs.unlinkSync(filePath + delete_list[j]);
                }
            }
        }
    }

    res.send(200)
})

module.exports = router;