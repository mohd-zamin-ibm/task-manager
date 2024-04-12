import * as http from 'http';
import * as mongoose from 'mongoose';
import { app } from './app';
import { Settings } from './environment/config';

const PORT = Settings.PORT;

const MONGO_URI = process.env['MONGO_URL'];

const server = http.createServer(app);

server.listen(PORT);

server.on('listening', async () => {
  console.log(`Listening on Port ${PORT}`);
  mongoose.connect(MONGO_URI);
  mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB.');
  });
  mongoose.connection.on('error', (err: any) => {
    console.error(err);
  });
});
