import { connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { errorHandler } from "../../middlewares/error";
import { asyncError } from "../../middlewares/error";
import { checkAuth } from "../../utils/features";

const handler = asyncError(async (req, res) => {
  await connectDB();

  const { title, description } = req.body;

  if (req.method !== "POST")
    return errorHandler(res, 400, "Only post method is allowed")
  // res.status(400).json({
  //     success: false,
  //     message: "Only post method is allowed",
  //   });

  if (!title || !description)
  return errorHandler(res, 400, "Please enter all fields")

  const user = await checkAuth(req)
  if(!user) return errorHandler(res, 401, "Login first")

  await Task.create({
    title,
    description,
    user: user._id,
  });

  //   await Task.create({
  //     title: "Sampled title",
  //     description: "Sampled description",
  //     user: "aaaaaaaassssssssss"
  //   })

  res.send({
    success: true,
    message: "Task created succesfully"
  });
});

export default handler;
