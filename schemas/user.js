const Joi = require('joi');
const CreateError = require('http-errors');
const _ = require('lodash');

const updateUserSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi
            .string()
            .email(),
        phone: Joi
            .string()
            .length(10)
    })

    const { error, value } = schema.validate(req.body);
    if(error){
        return next(CreateError(400, error));
    }

    return next();
}

module.exports = {
    updateUserSchema
}