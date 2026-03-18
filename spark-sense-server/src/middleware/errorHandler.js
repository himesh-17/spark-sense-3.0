/**
 * Global error handler middleware.
 * Must be registered LAST in Express middleware chain.
 */
const errorHandler = (err, req, res, next) => {
    const isDev = process.env.NODE_ENV === 'development';
    const statusCode = err.statusCode || 500;

    console.error(`[Error] ${err.message}`, isDev ? err.stack : '');

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(isDev && { stack: err.stack }),
    });
};

module.exports = errorHandler;
