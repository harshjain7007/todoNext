// const { asyncError } = require("../../../middlewares/error");
import { asyncError, errorHandler } from "../../../middlewares/error"
import { checkAuth } from "../../../utils/features";


const handler = asyncError(async(req, res) => {

    if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET method is allowed")

  const user = await checkAuth(req)

  if(!user) return errorHandler(res, 401, "Login first")

    res.status(200).json({
    success: true,
    user
  });

});

export default handler