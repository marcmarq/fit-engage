import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connect to the 'fitEngageDB' database
    await mongoose.connect(`${process.env.MONGODB_URI}fitEngageDB`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database Connected Successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

