import express from 'express';
import { collectAndDistribute } from './helpers/collectAndDistribute';
import dotenv from 'dotenv';
import { Scheduler } from './scheduler';
dotenv.config();
const app = express();

const scheduleTasks = () => {
    const collectScheduler = new Scheduler(24 * 60 * 60 * 1000);
    const collectTask = () => {
        try {
            collectAndDistribute();
        } catch (e) {
            console.log(e);
            process.exit(1);
        }
    }
    collectScheduler.addTask(collectTask);
    collectScheduler.start()
}

app.listen(4000, () => {
    scheduleTasks()
    console.log(`server running on port 4000`);
});