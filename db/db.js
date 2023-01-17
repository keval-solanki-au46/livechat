const mongoose=require('mongoose')

const connectionURL="mongodb+srv://kevalsolanki:Keval%40123@kevalsolanki.usql6zk.mongodb.net/?retryWrites=true&w=majority"


//mongoose.set('strictQuery', false);


async function connectDB() {

 try {
     // 1) connect
    await mongoose.connect(connectionURL,{dbName: "Chatapp"})

    console.log("DB Connection Successful")
    
  } catch (error) {
    console.log("Error Connecting to DB")
  }
}

module.exports = connectDB