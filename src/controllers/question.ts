import { Request, Response } from "express"
import { prisma } from "../db"

const getExamQuestions = async (req: Request, res: Response) => {}
const createMultipleChoiceQuestion = async (req: Request, res: Response) => {
    const { title, options, answer, examId } = req.body
    try {
        await prisma.question.create({
            data: {
                title,
                options: {
                    create: options.map((option: string) => ({
                        option
                    }))
                },
                answer: options[answer],
                examId
            }
        })

        res.json({
            message: 'Question created successfully',
            options
        })
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}
const createTrueFalseQuestion = async (req: Request, res: Response) => {}

export {
    getExamQuestions,
    createMultipleChoiceQuestion,
    createTrueFalseQuestion
}