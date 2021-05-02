const Joi = require('joi');
const CreateError = require('http-errors');
const _ = require('lodash');

const registerUserSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi
            .string()
            .email()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required(),
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

const loginUserSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi
            .string()
            .email()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    })

    const { error, value } = schema.validate(req.body);
    if(error){
        return next(CreateError(400, error));
    }

    return next();
}

module.exports = {
    registerUserSchema,
    loginUserSchema
}