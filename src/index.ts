import express from 'express';
import { connectToMongo } from './modules/db';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';

import routerManager from './routers/routerManager';
import swaggerDefinition from './config/swagger';

const app = express();
const PORT = 3000;

const startApp = async () => {
  try {
    app.use(bodyParser.json());
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

    await connectToMongo();

    routerManager(app);

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('Error occured: ', error);

    process.exit(1);
  }
};

startApp();
