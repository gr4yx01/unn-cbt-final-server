import { Request, Response } from "express"

const getExaminerPublishedExams = async (req: Request, res: Response) => {
    res.json('exams returned')
}

const getStudentWrittenExams = async (req: Request, res: Response) => {
    res.json('exams returned')
}

const createExam = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        res.json({
            message: `Exam with id ${id} created`
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