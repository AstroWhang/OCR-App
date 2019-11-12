// declared all our imports
// helps manage servers and routes
const express = require('express');
const app = express();
// read files on your computer
const fs = require("fs");
// middleware to handle uploading of files
const multer = require('multer');
// analyzes images that are uploaded
const {
  createWorker
} = require('tesseract.js');
const worker = createWorker(); 

// declared storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
}).single('avatar');

app.set('view engine', 'ejs');

// routes

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/upload', (req, res) => {
  upload(req,res, err => {
    console.log(req.file);
  })
})

// START UP our server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

