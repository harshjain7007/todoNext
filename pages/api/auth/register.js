// const { asyncError } = require("../../../middlewares/error");
import { asyncError } from "../../../middlewares/error"
import { User } from "../../../models/user";
import { errorHandler } from "../../../middlewares/error";
import { connectDB } from "../../../utils/features";

import { cookieSetter } from "../../../utils/features";
import { generateWebToken } from "../../../utils/features";

import bcrypt from "bcrypt"

const handler = asyncError(async(req, res) => {

    if (req.method !== "POST")
    return errorHandler(res, 400, "Only post method is allowed")

    const { name, email, password } = req.body

    // console.log("==>>", name, email, password);

    if(!name || !email || !password) return errorHandler(res, 400, "Please enter all fields")

    await connectDB()

    let user = await User.findOne({ email })

    if(user) return errorHandler(res, 400, "already user registered with this email")

    let hashPass = await bcrypt.hash(password, 10) // 10 is round
    
    user = await User.create({
        name,
        email,
        password : hashPass
    })
    
    let token = generateWebToken(user._id)
    cookieSetter(res, token, true)

    res.status(201).json({
    success: true,
    message: "Registered Successfully",
    user,
  });

});

export default handler