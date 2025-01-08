import { Router } from "express";
import { createExaminerAccount, createStudentAccount, loginAsExaminer, loginAsStudent } from "../controllers/auth";

const authRouter = Router()

authRouter.post('/register/examiner', createExaminerAccount)
authRouter.post('/register', createStudentAccount)
authRouter.post('/login/examiner', loginAsExaminer)
authRouter.post('/login', loginAsStudent)


export default authRouter