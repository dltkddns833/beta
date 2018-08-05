var express = require('express');
var router = express.Router();
var fs = require('fs');
var zip = require('zip-folder');
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

router.post('/sendMail', function(req, res, next){
    var Transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth : {
            user : 'dltkddns833@gmail.com',
            pass : '!mufeat0815'
        }
    });

    var attch_list = fs.readdirSync('./public/uploads')
    console.log('메일테스트')
    console.log(attch_list)
    // for(var i = 0; i < attch_list.length; i++){
    //     zip.file(attch_list[i], fs.readFileSync('./public/uploads/'+attch_list[i]));
    // }
    // var data = zip.generate({base64:false, compression:'DEFLATE'});
    // console.log(data);
    // fs.writeFileSync('test.zip', data, 'binary');
    // zip('./public/uploads', './public/uploads/test.zip', function(err) {
    //     if(err) {
    //         console.log('oh no!', err);
    //     } else {
    //         console.log('EXCELLENT');
    //     }
    // });
    // zip('./public/uploads', function (err, buffer) {
    //     console.log(buffer);
    //     if(err){
    //         console.log(err)
    //     }
    // });


    var mailOptions = {
        from : req.body.name + '<dltkddns833@gmail.com>',
        to: 'daydream_bubble@naver.com',
        subject : 'Test',
        text : 'Mail Test name : ' + req.body.name + ' phone : ' + req.body.phone,
        attachments : [
            {
                filename: attch_list[0],
                path : './public/uploads/' + attch_list[0]
            },
            {
                filename: attch_list[1],
                path : './public/uploads/' + attch_list[1]
            },
            {
                filename: attch_list[2],
                path : './public/uploads/' + attch_list[2]
            },
        ]
    }

    Transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        }else {
            console.log('Email sent! : ' + info.response);
        }
        Transporter.close();
        
    });
    
    res.send();
        
});

router.post('/sendImage', upload.single('imagefile'), function(req, res, next){
    res.end('Sucess')
});

router.post('/deleteImage', function(req, res, next){
    var filePath = './public/uploads/';
    console.log(req.body)
    var filename = req.body.name;
    fs.unlinkSync(filePath + filename);
    res.send('Sucess');
})

module.exports = router;