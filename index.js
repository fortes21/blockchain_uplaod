const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const Blockchain = require("./blockchain/blockchain.js");

app.set('view engine', 'ejs');

const storage = multer.diskStorage( {
    destination: function(req, file, cb){
        cb (null, "uploads/")    
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage})
let blockchain;

app.get("/",(req, res) => {
    res.render("home");
})

app.post("/upload", upload.single("file"), (req, res) => {
    blockchain.addBlock(req.file);
    res.send("Arquivo recebido");
})

app.post("/registro", (req, res) => {
    res.render("registro", {blockchain});
});

app.listen(8080,() =>{
    blockchain = new Blockchain();
    console.log("Servidor rodando na porta 8080.");
});