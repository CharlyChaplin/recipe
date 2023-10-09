class ApiError extends Error {
	status;
	errors;

	constructor(status, message, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static UnathorizedError(message) {
		return new ApiError(401, message ? message : "User not authorized");
	}

	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors);
	}

	static NotFoundURL(message, errors = []) {
		return new ApiError(404, message, errors);
	}

	static ValidationError(errors = []) {
		return new ApiError(500, "Internal server error", errors);
	}
}

export default ApiError;