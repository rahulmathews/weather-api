const basicErrorHandler = (app) => {
    try{
        app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
        
            console.error(err);
            
            // render the error page
            if(err.status === 400){
                return res.status(err.status).json({
                    message : "Bad Request",
                    error: err.message,
                    success: false
                });
            }
            else if(err.status === 500){
                return res.status(err.status).json({
                    message : "Internal Server Error",
                    success: false
                });
            }
            else if(err.status === 404){
                return res.status(err.status).json({
                    message : "Not Found",
                    success: false
                });
            }
            else if(err.status === 403){
                return res.status(err.status).json({
                    message : "Forbidden",
                    success: false
                });
            }
            else if(err.status === 401){
                return res.status(err.status).json({
                    message : "Unauthorised",
                    success: false
                });
            }
            else{
                return res.status(err.status || 500).json({
                    message : "Internal Server Error",
                    success: false
                });
            }
        });
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    basicErrorHandler
}