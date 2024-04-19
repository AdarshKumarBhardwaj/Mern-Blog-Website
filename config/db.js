const mongoose=require('mongoose')

const connectDB=async()=>{
  try {
  await  mongoose.connect(process.env.MONGO_URL)
    console.log(`connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta.white)
  } catch (error) {
    console.log(`Mongo Connect Error ${error}`.bgRed.white)
  }
}

module.exports=connectDB