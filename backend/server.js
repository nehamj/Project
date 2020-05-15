const express = require('express')
const PORT = 8080
const multer = require('multer')
const upload = multer({dest: 'upload/'})
const fs = require('fs')
const cors = require('cors')

var app = express()

app.use(cors())

var yourFilePath = 'upload/demo.wav'

app.post('/send-file', upload.single('file'), function(req,res) {
    
    fs.rename(req.file.path, yourFilePath, function(err) {
        if(err) 
            console.log(err)
    })

    res.send("OK");

})

app.listen(PORT, () => {
    console.log('server started on port ', PORT)
})
