let serverError = {
    responseCode: 500,
    message: "INTERNAL_SERVER_ERROR"
};
let notFound = {
    responseCode: 404,
    message: "NOT_FOUND"
};

let badRequest = {
    responseCode: 400,
    message: "BAD_REQUEST"
};

let errorCode4 = {
    responseCode: 405,
    message: "NOT_ACCEPTABLE"
};

let success = {
    responseCode: 200,
    message: "success"
};

exports.serverError = serverError;
exports.success = success;
exports.badRequest = badRequest;
exports.notFound = notFound;
exports.errorCode4 = errorCode4;