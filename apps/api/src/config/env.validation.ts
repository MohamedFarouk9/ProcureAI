import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    // Application
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    PORT: Joi.number().default(3000),

    //postgresql
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),

    // Redis
    REDIS_HOST: Joi.string().default('localhost'),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_PASSWORD: Joi.string().default(''),
    REDIS_DB: Joi.number().default(0),


    // Authentication
    JWT_SECRET: Joi.string().min(32).required(),
    JWT_EXPIRATION_SECONDS: Joi.number().default(3600),

})