import { connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { errorHandler } from "../../middlewares/error";
import { asyncError } from "../../middlewares/error";
import { checkAuth } from "../../utils/features";

const handler = asyncError(async (req, res) => {
    if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET method is allowed")
// res.status(400).json({
    //     success: false,
    //     message: "Only post method is allowed",
    //   });
    await connectDB();

  const user = await checkAuth(req)

  if(!user) return errorHandler(res, 401, "Login first")

  const tasks = await Task.find({user: user._id})

  res.send({
    success: true,
    tasks,
    message: "Task fetched succesfully"
  });
});

export default handler;
