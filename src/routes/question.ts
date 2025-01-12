import { Router } from "express";
import { createMultipleChoiceQuestion, createTrueFalseQuestion } from "../controllers/question";

const questionRouter = Router()

questionRouter.post('/:id/multiple', createMultipleChoiceQuestion)
questionRouter.post('/:id/binary', createTrueFalseQuestion)

export default questionRouter