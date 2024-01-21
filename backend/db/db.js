import mongoose from 'mongoose'


const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then((conn) => {
                console.log(`Connect to Database ${conn.connection.host}`);
            })
    } catch (e) {
        console.log(e);
    }
}


export default connectToDB