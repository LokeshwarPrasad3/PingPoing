

// 👉indicating that the requested resource is not available.
// Its main purpose is to return a "Not Found" response (HTTP status code 404) to the client,

// we know that if three parameter then (req, res, next)
const notFound = (req, res, next) =>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}


// if not handled by notFound then handle
// we know that if four parameter then (err, req, res, next)
const errorHandler = (err, req ,res, next)=>{
    const statusCode = res.statusCode === 200? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack : process.env.NODE_ENV === "production"?null : err.stack
    });
};

module.exports = {notFound, errorHandler};