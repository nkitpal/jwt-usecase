const express = require("express");
const jwt = require("jsonwebtoken");
const jwtpassword = "hkj12456";

const port = 3000;

app = express();
app.use(express.json());

let users =  [
    {
      "username": "user1",
      "password": "pass123"
    },
    {
      "username": "user2",
      "password": "password456"
    },
    {
      "username": "john_doe",
      "password": "securePass"
    }
  ]


function userexists(username, password){
    
    return users.find((x) => {
        return (x.username == username && x.password == password)? true:false; 
    })
}


// parse body - username and password;
app.post("/signin",(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userexists(username,password)){
        return res.status(403).json({
            msg : "you are not a authorized user!"
        });
    }

    const token = jwt.sign({username : username},jwtpassword);

    return res.json({
        token
    });
})

app.listen(port, ()=>{
    console.log("listening");
})