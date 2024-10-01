const mongoose=require('mongoose')
const ENV_VARS=require('./envVars.js')


const connectDB=async()=>{
    try {
      const conn =  await mongoose.connect(ENV_VARS.MONGO_URL)
      console.log("mongoodb connected");
    } catch (error) {
        console.log("mongoodeb not connected");
        
    }
}

module.exports = connectDB