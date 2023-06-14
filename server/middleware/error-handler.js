const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({msg: err.message || 'there was an error'})
}
export default errorHandlerMiddleware
