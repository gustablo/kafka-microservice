import mongoose from 'mongoose';

const { Schema } = mongoose;

const Customer = new Schema({
    name: {
        type: String,
        required: true,
    },
});

export const CustomerSchema = mongoose.model('customers', Customer);
