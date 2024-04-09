import * as express from 'express';
import validator from '../helpers/validator';
import { TaskModel } from '../model/task-manager';
import schema from './schema';
import { verifyToken } from './verifyToken';

const taskManagerRoutes = express.Router();

taskManagerRoutes.get('/:id', verifyToken, async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
  const id = req.params['id']; // Assuming the user ID is passed as a query parameter
  try {
    // Use the correct filter syntax to find tasks created by the user
    const items = await TaskModel.find({ createdBy: id });

    // Map the items to the desired response format
    const formattedItems = items.map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      createdBy: item.createdBy,
			isCompleted: item.isCompleted,
      dueDate: item.dueDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    resp.json(formattedItems); // Send the formatted items as JSON response
  } catch (err) {
    console.error('Caught Error', err);
    resp.status(500).end(); // Send 500 status in case of error
  }
});

taskManagerRoutes.post(
  '/',
  verifyToken,
	validator(schema.taskCreate),
  async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const taskManagerBody = {
      title: req.body['title'],
      description: req.body['description'],
      createdBy: req.body['createdBy'],
      dueDate: req.body['dueDate'],
			isCompleted: req.body['isCompleted'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const items = new TaskModel(taskManagerBody);
    await items.save();
    resp.end();
  }
);

taskManagerRoutes.put(
  '/:id',
  verifyToken,
	validator(schema.taskUpdate),
  async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const taskManagerBody = {
      title: req.body['title'],
      description: req.body['description'],
			isCompleted: req.body['isCompleted'],
      updatedAt: new Date(),
      dueDate: req.body['dueDate'],
    };
    const id = req.params['id'];
    await TaskModel.findByIdAndUpdate(id, taskManagerBody);
    resp.end();
  }
);

taskManagerRoutes.delete(
  '/:id',
  verifyToken,
  async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const id = req.params['id'];
    await TaskModel.findByIdAndDelete(id);
    resp.end();
  }
);

export { taskManagerRoutes };

