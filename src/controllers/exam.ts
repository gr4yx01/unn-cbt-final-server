import { Request, Response } from "express"
import { prisma } from "../db"

const getExaminerPublishedExams = async (req: Request, res: Response) => {
    res.json('exams returned')
}

const getStudentWrittenExams = async (req: Request, res: Response) => {
    res.json('exams returned')
}

const createExam = async (req: Request, res: Response) => {
    const { title, description, duration, examType } = req.body
    try {
        await prisma.exam.create({
            data: {
                title,
                description,
                duration,
                examType,
                ExaminerId: req.userId || ''
            }
        })

        res.json({
            message: `Exam successfully created!!!`
        })
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const participateInExam = async (req: Request, res: Response) => {}

const submitExam = async (req: Request, res: Response) => {}

export {
    getExaminerPublishedExams,
    getStudentWrittenExams,
    createExam,
    participateInExam,
    submitExam
}