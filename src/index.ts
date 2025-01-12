import express, { json }  from 'express';
import cors from 'cors'
import examRouter from './routes/exam';
import authRouter from './routes/auth';
import questionRouter from './routes/question';


const app = express();

app.use(cors())
app.use(json())

app.use('/exams', examRouter)
app.use('/auths', authRouter)
app.use('/questions', questionRouter)

app.listen(3001, () => {
  console.log('App is running on port 3001');
});