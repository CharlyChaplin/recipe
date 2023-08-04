import ApiError from "../exeptions/apiError.js";

function errorMiddleware(err, req, res, next) {
	console.log("Catched Error: ", err);
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	} else {
		res.status(500).json({ message: "Internal Error" })
	}
}

export default errorMiddleware;