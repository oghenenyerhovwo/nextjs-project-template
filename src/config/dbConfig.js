import mongoose from 'mongoose';

const connect = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1/secure_rent');
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}

export default connect