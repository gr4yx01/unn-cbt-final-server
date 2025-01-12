import { Router } from "express";
import { createExam, getExaminerPublishedExams, getExamQuestions, getStudentWrittenExams, participateInExam, submitExam } from "../controllers/exam";
import { isExaminer, verifyToken, isStudent } from "../middleware";

const examRouter = Router()

examRouter.get('/examiner', verifyToken, isExaminer, getExaminerPublishedExams)
examRouter.get('/student', verifyToken, isStudent, getStudentWrittenExams)
examRouter.post('/', verifyToken, isExaminer, createExam)
examRouter.get('/:id/participate', verifyToken, isStudent, participateInExam)
examRouter.post('/:id/submit', verifyToken, isStudent, submitExam)
examRouter.get('/:id/questions', getExamQuestions)

export default examRouter