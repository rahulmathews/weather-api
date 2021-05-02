const morgan = require('morgan');


const basicLogger = ( app ) => {
    try{
        const logger = {
            write : function( msg ){
                console.log(msg.trimRight());
            }
        }
        
        if(process.env.NODE_ENV === 'development'){
            app.use(morgan('dev'));
        }
        else{
            app.use(morgan(':method :url :status :response-time ms', { stream: logger }));
        }
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    basicLogger
}