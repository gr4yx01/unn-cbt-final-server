import { Router } from "express";
import { createExam, getExaminerPublishedExams, getStudentWrittenExams, participateInExam, submitExam } from "../controllers/exam";
import { isExaminer, verifyToken } from "../middleware";

const examRouter = Router()

examRouter.get('/examiner', getExaminerPublishedExams)
examRouter.get('/student', getStudentWrittenExams)
examRouter.post('/:id', createExam)
examRouter.get('/:id/participate', participateInExam)
examRouter.post('/:id/submit', submitExam)

export default examRouter