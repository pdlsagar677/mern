import express from 'express';
import router from './router/auth-router.js'; 
import connectDb from './utils/db.js';
import errorMiddleware from './middleware/error-middleware.js';
import contactRoute  from './router/contact-router.js'
import cors from 'cors';

const app = express();

app.use(express.json());

const corsOptions= {
  origin:" http://localhost:5173",
  method:"GET, POST, PUT, DELETE, PATCH, HEAD",
  Credential:true,
};
app.use(cors(corsOptions));

app.use("/api/auth", router);
app.use("/api/form", contactRoute);

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
