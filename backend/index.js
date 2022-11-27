import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from './gs.js';

const username = "admin";
const password = "gayathrisridhar";
const cluster = "cluster0.8eouofm";


const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/User?retryWrites=true&w=majority`;

mongoose.connect(uri,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


//generate otp function 
function generateOTP() {
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const app = express();
// database connection


//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());




//schema
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required :true,
    },
    mblnum:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    place:{
        type: String,
        required:true,
    },
    address:{
        type: String,
        required:true,
    }

    
});
const User = mongoose.model("admin",UserSchema);
//otpschema
const OtpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required :true,
    },
    mblnum:{
        type: String,
        required: true,
    }, 
});
const Otp = mongoose.model("otp",OtpSchema);


//routes
app.get("/",(req,res)=>{
    res.send("gs")
})
app.post("/register",async(req,res)=>{
    console.log(req.body)
    const user = req.body;
    const takenEmail = await User.findOne({email:user.email})
    if(takenEmail){
        res.json({message:"Email has already been taken"})
    }
    else{
        user.password = await bcrypt.hash(req.body.password,10)

        const dbUser = new User({
            email:user.email.toLowerCase(),
            password:user.password,
            name:user.name,
            mblnum:user.mblnum,
            place:user.place,
            address:user.address
        
        })
        dbUser.save()
        res.json({message:"Success"})
    }


})
app.post("/login",async(req,res)=>{
    const userLoggingIn = req.body;
    console.log(userLoggingIn)
    User.findOne({email:userLoggingIn.email}).then(dbUser =>{
        if(!dbUser){
            return res.json({
                message:"Invalid email or password"
            })
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then(isCorrect =>{
            if(isCorrect){
                const payload ={
                    id:dbUser._id,
                    username:dbUser.email,
                }
                jwt.sign(
                    payload,
                    "hello",
                    {expiresIn:86400},
                    (err,token) => {
                        if(err) return res.json({message:err})
                        return res.json({
                            message:"Success",
                            token:"Bearer " + token,
                            Email: dbUser.email
                        })
                    }
                )
            }else{
                return res.json({
                    message:"Invalid username or password"
                })
            }
        })
    })
}
)
function verifyJWT(req, res, next){
    const token = req.headers["x-access-token"]?.split(' ')[1]
    // console.log(req.headers["x-access-token"]?.split(' ')[1]+"token orint")
    if(token){
        jwt.verify(token,"hello",(err,decoded)=>{
        if(err) return res.json({
            isLoggedIn: false,
            message: "Failed to authenticate"
        })
        req.user = {};const token = req.headers["x-access-token"]?.split(' ')[1]
        req.user.id = decoded.id
        req.user.username = decoded.username
        next()
    })
}else {
    res.json({message:"Incorrect Token Given",isLoggedIn:false})
}}
app.get("/getusername",verifyJWT,(req,res)=>{
    res.json({isLoggedIn: true, username: req.user.username})
})
app.post("/getdetails",(req,res)=>{
    const var1 = req.body["user"]
    console.log(var1)

    User.findOne({
        email : var1
    }).then((results)=>{
        res.send(
             results
         )
    })
    
})
app.post("/update",async(req,res)=>{

    const userupdate = req.body;
    console.log(userupdate)
    const username = userupdate["Name"];
    const mblnum = userupdate["mblnum"];
    const place = userupdate["place"];
    const email = userupdate["email"];
    await User.updateMany({ "email" : email} , {"name" : username  , "mblnum" : mblnum , "place" : place});
    res.send({
        "status":"success",

    })
})
app.post("/generateotp",(req,res)=>{
    const gtp = req.body;
    console.log(gtp.number);
    User.find({email:gtp.email,mblnum:gtp.number},function (err,docs){
        if(err){
            console.log(err);
            res.send({
                "status":"network failure"
            })
        }
        else{
            console.log(docs);
            if(docs.length!=0){

                var otp = generateOTP();
                client.messages.create({body: `OTP :${otp} `,to: `+91${gtp.number}`, from: '+14302491500', })
                .then(
                    (result)=>{
                        Otp.create({otp:otp,email:gtp.email,mblnum:gtp.number})
                        .then(result =>{
                            console.log(result);
                            res.send({
                                "status":"otp sent"
                            })

                        })
                        .catch((e) =>{
                            res.send({
                                "status":"internal error"
                            })
                        })
                        
                    }
                    )
                .catch((error)=>{
                    res.send({
                        "status":"can't send otp"
                    })
                        console.log(error)
                    })
            }
            else{
                res.send({
                    "status":"nodata"})
            }
        }
    });
})
app.post("/verifyotp",(req,res)=>{
    const vtp = req.body;
    var otp = vtp.otp;
    var mail = vtp.mail;
    var mobile = vtp.mobile;
    Otp.find({otp:otp,mail:mail,mobile:mobile},function (err,docs)  {
        if(err){
            console.log(err)
            res.send({
                "status" : "invalid"
            })
        }
        if(docs.length!=0){
            if(docs[0].otp==otp){
                Otp.deleteOne({
                    mail: mail
                }).then(
                    res.send({
                        "status" : "success"
                    })
                )
                
            }
            else{
                res.send({
                    "status" : "invalid"
                })
            }
        }
        else{
            res.send({
                "status" : "invalid"
            })
        }
    
        
        
    });

})
app.post("/resetpassword",async (req,res)=>{
   const rpwd = req.body;
   var passwd = rpwd.password
   var email  = rpwd.email
   var password = await bcrypt.hash(passwd,10)
   User.updateOne({ "email" : email} , {"password" : password }).then((res)=>{
    res.send({
        "status":"success",

    })
   console.log(rpwd);
})
.catch((err)=>{
    res.send({
        "status" :"failure"
    })
})
})


//start server
app.listen(
    3002,
    () =>{
        console.log("server started")
    }
)
