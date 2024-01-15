// const { asyncError } = require("../../../middlewares/error");
import { asyncError } from "../../../middlewares/error"
import { errorHandler } from "../../../middlewares/error";

import { cookieSetter } from "../../../utils/features";


const handler = asyncError(async(req, res) => {

    if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET method is allowed")

    cookieSetter(res, null, false)

    res.status(200).json({
    success: true,
    message: `Logged Out Successfully`,
    // user,
  });

});

export default handler