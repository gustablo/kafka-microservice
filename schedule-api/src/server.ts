import mongoose from 'mongoose';
import { CreateScheduleUseCase } from './application/usecases/create-schedule.usecase';
import { CreateScheduleController } from './presentation/create-schedule.controller';
import { KafkaBroker } from './infra/broker/kafka/kafka-broker';
import { ScheduleMongoRepository } from './infra/repository/schedule-mongo.repository';
import { app } from './infra/http/app';

const broker = new KafkaBroker();

mongoose.connect('mongodb://db:27017/schedule-api').then(() => {
    console.log('Database connected');

    broker.subscribe('customer.created', async (message: string) => {
        const messageJSON = JSON.parse(message);
    
        const repository = new ScheduleMongoRepository();
        const usecase = new CreateScheduleUseCase(repository);
    
        const controller = new CreateScheduleController(usecase);
    
        await controller.exec(JSON.parse(messageJSON.value));
    });

    app.listen(3000, () => console.log('running schedule-api'));
}).catch(console.error);

mongoose.set('debug', true);
