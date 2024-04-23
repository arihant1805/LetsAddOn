const express=require("express");
const cors=require("cors");
const mongooose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const  app= express();
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes); 

mongooose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB Connection successfull");
}).catch((err)=>{
    console.log(err.message);
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on the post ${process.env.PORT}`)
})
