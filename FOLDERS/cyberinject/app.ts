import {Database} from "bun:sqlite"
const express = require("express");
const Bun = require('bun')
const qs = require("qs")

const app = express();
const db = new Database("SQLI.db")

app.use("/static",express.static("static"));
app.set('query parser', function(str:string){
    return str
})
type response = {send:(text:string)=>any,status:(statusCode:number)=>any,render:any}
app.get("/",async (req:any, res:response)=>{
    res.send(await Bun.file("index.html").text());
})

app.get("/records", async (req:{param:(key:string)=>string}, res:response)=>{
    try{
        console.log(req.param("userID"),req.param("pass"))
        console.log(`select * from medicalRecords where userID='${(req.param("userID").replace(/^US/i,""))}' and passkey='${Bun.hash(req.param("pass"))}'`)
        let sql:any[] = db.query(`select * from medicalRecords where userID='${(req.param("userID").replace(/^US/i,""))}' and passkey='${Bun.hash(req.param("pass"))}'`).all("N/A")
        console.log(sql,sql[0])
        if(sql.length == 0){
            res.status(404).send("404: User ID & Password don't match");
        }
        let file = await Bun.file("redirect.html").text();
        for(let i in sql[0]){
            file = file.replaceAll(`{{${i}}}`, sql[0][i]);
        }
        res.send(file);
    }catch(e: any){
        res.status(500).send(String(e));
        throw new Error(e);
    }
})
app.use((err:any, req:any, res:any, next:any)=>{
    if(res.headersSent){
        return next(err)
    }
    res.status(500);
})

app.listen(3001)

// 101 - WeakPassword123
