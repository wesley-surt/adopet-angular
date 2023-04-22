import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://wesley:surtwesley@cluster0.0uuwmvs.mongodb.net/adopet`);

let db = mongoose.connection;

export default db;
