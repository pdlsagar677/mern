import mongoose from 'mongoose';

const URI = process.env.MONGO_URI || 'mongodb+srv://sagarpoudel677:774sDmccQFV2rYqv@cluster3.vu8ct.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster3';

const connectDb = async () => {
  try {
    await mongoose.connect(URI);  // Removed the deprecated options
    console.log('Connection successful to DB');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error; // Re-throw the error to be caught in server.js
  }
};

export default connectDb;


  