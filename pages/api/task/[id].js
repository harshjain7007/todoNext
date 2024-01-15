import { connectDB } from "../../../utils/features";
import { Task } from "../../../models/task";
import { errorHandler } from "../../../middlewares/error";
import { asyncError } from "../../../middlewares/error";
import { checkAuth } from "../../../utils/features";


const handler = asyncError(async (req, res) => {

    await connectDB();
        const user = await checkAuth(req)
        if (!user) return errorHandler(res, 401, "Login first")

        // console.log(req.query);
        const taskId = req.query.id

        
        const task = await Task.findById(taskId)
        
        // console.log("taskId==>", task);
        if(!task) return errorHandler(res, 404, "Task not found")

    if (req.method === "PUT") {

        

        task.isCompleted = !task.isCompleted
        // console.log("taskId@==>", task);

        await task.save()

        res.status(200).json({
            success: true,
            message: "Task Updated succesfully"
        });
        

    } else if (req.method === "DELETE") {

        await task.deleteOne()

        res.status(200).json({
            success: true,
            message: "Task Deleted succesfully"
        });

    } else {
        return errorHandler(res, 400, "This method is not availble")
    }




    
});

export default handler;
