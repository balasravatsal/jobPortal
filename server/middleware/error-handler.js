// const errorHandlerMiddleware = (err, req, res, next) => {
//     console.log(err)
//     res.status(err.statusCode || 500).json({msg: err.message || 'there was an error'})
// }
// export default errorHandlerMiddleware

const errorHandlerMiddleware = (err, req, res, next) => {
    // Check if headers have already been sent
    if (res.headersSent) {
        return next(err);
    }

    // Handle the error
    res.status(err.statusCode || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
};

export default errorHandlerMiddleware;
