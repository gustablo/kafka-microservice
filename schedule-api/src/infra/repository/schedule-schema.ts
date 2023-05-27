import mongoose from 'mongoose';

const { Schema } = mongoose;

const Schedule = new Schema({
    appointmentDate: {
        type: Date,
        required: true,
    },
    customerRefId: {
        type: String,
        required: true,
    }
});

export const ScheduleSchema = mongoose.model('schedules', Schedule);
