import { app } from './infra/http/app';
import mongoose from 'mongoose';

mongoose.connect('mongodb://db:27017/customer-api').then(() => {
    console.log('Database connected');
    app.listen(3001, () => console.log(`running customer api`));
}).catch(console.error);

mongoose.set('debug', true);

