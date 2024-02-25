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


// parse body - username and password and generate token
app.post("/signin",(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userexists(username,password)){
        return res.status(403).json({
            msg : "User does not exist!"
        });
    }

    const token = jwt.sign({username : username},jwtpassword);

    return res.json({
        token
    });
})


//verify user return list of users other than current user
app.get('/users',(req, res) => {

    const token = req.headers.authorization;
    const decoded_token = jwt.verify(token, jwtpassword);

    const username = decoded_token.username;

    // return a list of users other than this user;

    const user_list = users.filter((user) => {
        return user.username == username?false:true;
    })

    res.json({user_list});
})

function handleError(err,req,res,next){
    res.status(403).send("Unauthorized access");
}

app.use(handleError);

app.listen(port, ()=>{
    console.log("listening");
})