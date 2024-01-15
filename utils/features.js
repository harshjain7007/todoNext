import mongoose from "mongoose" 
import { serialize } from "cookie"; // for set cookie
// import { Jwt } from "jsonwebtoken";
// import { Jwt } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { User } from "../models/user";



export const connectDB = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "NextTodo" // save your data with this dataBase name
    })

    console.log(`Database connected on ${connection.host}`);
}


export const cookieSetter = (res, token, set) => {
    // const token = "jhbjhv"
    res.setHeader("Set-Cookie", serialize("token", set?token:"", {
        path: "/",
        httpOnly:true,
        maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0, // 15 days // which token kab tak valid rahega 
    }))
}

export const generateWebToken = (_id) => {
    // return Jwt.sign({_id}, process.env.JWT_SECERET)
  return jwt.sign({ _id }, process.env.JWT_SECRET);

} 


export const checkAuth = async (req) => {
    const cookie = req.headers.cookie

    if(!cookie) return null
    
    const token = cookie.split("=")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    return await User.findById(decoded._id)
}

