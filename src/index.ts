import express, { json }  from 'express';
import cors from 'cors'
import examRouter from './routes/exam';
import authRouter from './routes/auth';


const app = express();

app.use(cors())
app.use(json())

app.use('/exams', examRouter)
app.use('/auths', authRouter)

app.listen(3000, () => {
  console.log('App is running on port 3000');
});