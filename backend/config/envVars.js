const dotenv=require('dotenv')
dotenv.config()

const ENV_VARS={
    MONGO_URL:process.env.MONGO_URL,
    PORT:process.env.PORT || 8000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
}

module.exports= ENV_VARS