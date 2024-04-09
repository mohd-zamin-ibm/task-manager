import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { requestLoggerMiddleware } from './requestLogger.middleware';
import { taskManagerRoutes } from './routes/task-manager.controller';
import { userRoutes } from './routes/users.controller';

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyparser.json());

app.use(requestLoggerMiddleware);

app.use("/api/tasks", taskManagerRoutes);
app.use("/api/", userRoutes);

export { app };

