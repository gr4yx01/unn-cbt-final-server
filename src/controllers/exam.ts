import { Request, Response } from "express"
import { prisma } from "../db"
import { generateCode } from "../helper"

const getExamQuestions = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const questions = await prisma.question.findMany({
            where: {
                examId: id
            },
            include: {
                options: true
            }
        })
        
        res.status(200).json(questions)

    } catch (err) {
        res.status(500).json({
            message: 'An error occured'
        })
    }
}


const getExaminerPublishedExams = async (req: Request, res: Response) => {
    try {
        const exams = await prisma.exam.findMany({
            where: {
                ExaminerId: req.userId
            },
            include: {
                ExamTaken: true
            }
        })

        res.status(200).json(exams)
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const getStudentWrittenExams = async (req: Request, res: Response) => {
    try {
        const exams = await prisma.examTaken.findMany({
            where: {
                userId: req.userId
            }
        })

        res.status(200).json(exams) 
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
    res.json('exams returned')
}

const createExam = async (req: Request, res: Response) => {
    const { title, description, duration, examType, noOfQuestions } = req.body
    try {
        const code = generateCode()

        const exam = await prisma.exam.create({
            data: {
                title,
                description,
                exam_code: code,
                duration,
                examType,
                noOfQuestions,
                ExaminerId: req.userId || ''
            }
        })

        res.json({
            message: `Exam successfully created!!!`,
            data: exam
        })
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
        console.log(err)
    }
}

const participateInExam = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await prisma.examTaken.create({
            data: {
                score: 0,
                userId: req.userId || '',
                examId: id
            }
        })

        res.status(200).json({
            message: `Success`
        })

    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const getExamParticipants = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const participants = await prisma.examTaken.findMany({
            where: {
                examId: id
            }
        })

        res.status(200).json(participants)
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const getExamDetail = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const exam  = await prisma.exam.findUnique({
            where: {
                id
            },
            include: {
                ExamTaken: true,
                questions: {
                    include: {
                        options: true
                    }
                }
            }
        })

        res.status(200).json(exam)
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const submitExam = async (req: Request, res: Response) => {
    const { score } = req.body
    const { id } = req.params
    
    try {
        await prisma.examTaken.update({
            where: {
                id
                // userId: req.userId,
                // examId: id
            },
            data: {
                score
            }
        })

        res.status(201).json({
            message: "Successfully submitted"
        })
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const fetchExam = async (req: Request, res: Response) => {
    const { exam_code } = req.body
    

    try {
        const examExist = await prisma.exam.findFirst({
            where: {
                exam_code: Number(exam_code)
            }
        })

        const alreadyWritten = await prisma.examTaken.findFirst({
            where: {
                AND: {
                    examId: examExist?.id,
                    userId: req.userId
                }
            }
        })


        if(alreadyWritten !== null) {
            res.status(400).json({
                message: 'You have already written this exam'
            })
            return
        }

        const exam = await prisma.exam.findFirst({
            where: {
                exam_code: Number(exam_code)
            }
        })

        res.status(200).json(exam)
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred',
            error: err
        })
        console.log(err)
    }
}

export {
    getExaminerPublishedExams,
    getStudentWrittenExams,
    createExam,
    participateInExam,
    submitExam,
    getExamQuestions,
    getExamDetail,
    getExamParticipants,
    fetchExam
}