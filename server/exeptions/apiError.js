class ApiError extends Error {
	status;

	constructor(status, message) {
		super(message);
		this.status = status;
	}

	static UnathorizedError(message) {
		return new ApiError(401, message ? message : "User not authorized");
	}

	static BadRequest(message) {
		return new ApiError(400, message);
	}

	static NotFoundURL(message) {
		return new ApiError(404, message);
	}

	static ValidationError() {
		return new ApiError(500, "Validation error");
	}
}

export default ApiError;