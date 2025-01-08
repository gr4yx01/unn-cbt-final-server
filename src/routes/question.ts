import { Router } from "express";
import { createMultipleChoiceQuestion, createTrueFalseQuestion, getExamQuestions } from "../controllers/question";

const questionRouter = Router()

questionRouter.get('/:id/exam', getExamQuestions)
questionRouter.post('/:id/multiple', createMultipleChoiceQuestion)
questionRouter.post('/:id/binary', createTrueFalseQuestion)

export default questionRouter