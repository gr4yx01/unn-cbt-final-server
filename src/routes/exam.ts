import { Router } from "express";
import { createExam, fetchExam, getExamDetail, getExaminerPublishedExams, getExamParticipants, getExamQuestions, getStudentWrittenExams, participateInExam, submitExam } from "../controllers/exam";
import { isExaminer, verifyToken, isStudent } from "../middleware";

const examRouter = Router()

examRouter.get('/examiner', verifyToken, isExaminer, getExaminerPublishedExams)
examRouter.get('/:id', verifyToken, isExaminer, getExamDetail)
examRouter.get('/:id/participants', verifyToken, isExaminer, getExamParticipants)
examRouter.post('/student', verifyToken, isStudent, fetchExam)
examRouter.get('/student/written', verifyToken, getStudentWrittenExams)
examRouter.post('/', verifyToken, isExaminer, createExam)
examRouter.post('/:id/participate', verifyToken, isStudent, participateInExam)
examRouter.post('/:id/submit', verifyToken, isStudent, submitExam)
examRouter.get('/:id/questions', getExamQuestions)

export default examRouter