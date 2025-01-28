import express from 'express';
import router from './router/auth-router.js'; 
import connectDb from './utils/db.js';
import errorMiddleware from './middleware/error-middleware.js';
const app = express();

app.use(express.json());

app.use("/api/auth", router);

app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection failed:', err);
  process.exit(1);
});
