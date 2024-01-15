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

    const { email, password } = req.body

    // console.log("==>>", name, email, password);

    if(!email || !password) return errorHandler(res, 400, "Please enter all fields")

    await connectDB()

    const user = await User.findOne({ email }).select("+password") // select means ab user main email ke sath sath password v rahega 

    if(!user) return errorHandler(res, 400, "Invalid email address")

    let isMatch = await bcrypt.compare(password, user.password ) // 10 is round
    
    if(!isMatch) return errorHandler(res, 400, "Password not matched")
    
    let token = generateWebToken(user._id)
    cookieSetter(res, token, true)

    res.status(200).json({
    success: true,
    message: `welcome back ${user.name}`,
    user,
  });

});

export default handler