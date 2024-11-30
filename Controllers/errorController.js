const CustomError = require('../Utils/customError');
const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.status,
        statusCode: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    });
};

const productionErrors = (res, error) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        });
    } else {
        res.status(500).json({
            status: 'Error',
            message: 'An Error Occured. Please Try Again Later'
        });
    };
};

const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const errorMessages = errors.join('. ');
    const msg = `Invalid Input Data: ${errorMessages}`;
    return new CustomError(msg, 400);
};


module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        devErrors(res, error);
    } else if (process.env.NODE_ENV === 'production') {
        if (error.name === 'ValidationError') {
            error = validationErrorHandler(error);
        };
        productionErrors(res, error);
    };  
};