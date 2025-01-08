import { Request, Response } from "express"

const getExamQuestions = async (req: Request, res: Response) => {}
const createMultipleChoiceQuestion = async (req: Request, res: Response) => {}
const createTrueFalseQuestion = async (req: Request, res: Response) => {}

export {
    getExamQuestions,
    createMultipleChoiceQuestion,
    createTrueFalseQuestion
}