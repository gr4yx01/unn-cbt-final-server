import { Request, Response } from "express"
import { prisma } from "../db"


const createMultipleChoiceQuestion = async (req: Request, res: Response) => {
    const { title, options, answer } = req.body
    const { id } = req.params

    try {

        // create question
        const questionResponse = await prisma.question.create({
            data: {
                title,
                answer: options[answer],
                examId: id
            }
        })

        console.log('***')
        
        // create options first
        options.forEach(async (option: string) => {
            await prisma.option.create({
                data: {
                    text: option,
                    questionId: questionResponse.id
                }
            })
        })

        res.json({
            message: 'Question created successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}
const createTrueFalseQuestion = async (req: Request, res: Response) => {
    const { title, answer } = req.body
    const { id } = req.params

    try {
        await prisma.question.create({
            data: {
                title,
                answer,
                examId: id
            }
        })

        res.json({
            message: 'Question created successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

export {
    createMultipleChoiceQuestion,
    createTrueFalseQuestion
}