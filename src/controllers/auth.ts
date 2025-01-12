import { Request, Response } from "express"
import { prisma } from "../db"
import * as argon from 'argon2'
import { generateCode } from "../helper"
import jwt from 'jsonwebtoken'

const createExaminerAccount = async (req: Request, res: Response) => {
    const { name, department } = req.body

    try {
        const examinerExist = await prisma.examiner.findFirst({
            where: {
                name: name,
                department: department
            }
        })

        if(examinerExist) {
            res.status(400).json({
                message: 'Examiner already exists'
            })
            return
        }

        const staff_code = generateCode()

        
        const examiner = await prisma.examiner.create({
            data: {
                name: name,
                department: department,
                staff_code: String(staff_code)
            }
        })

        const secret = process.env.JWT_SECRET

        const payload = {
            role: 'EXAMINER',
            staff_code: staff_code,
            userId: examiner?.id
        }

        if(secret) {
            const token = jwt.sign(payload, secret)
            res.status(201).json({
                access_token: token,
                staff_code: staff_code
            })
        }
        

    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const createStudentAccount = async (req: Request, res: Response) => {
    try {
        const { name, registration_number, password } = req.body

        const studentExist = await prisma.user.findFirst({
            where: {
                registration_number: registration_number
            }
        })

        if(studentExist) {
            res.status(400).json({
                message: 'Student already exists'
            })
            return
        }

        const hashedPassword = await argon.hash(password)

        const student = await prisma.user.create({
            data: {
                name,
                registration_number,
                password: hashedPassword
            }
        })

        const secret = process.env.JWT_SECRET

        console.log(secret)

        const payload = {
            role: 'STUDENT',
            registration_number: registration_number,
            userId: student?.id
        }

        if(secret) {
            const token = jwt.sign(payload, secret)
            res.status(201).json(token)
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const loginAsExaminer = async (req: Request, res: Response) => {
    const { staff_code, password } = req.body

    try {
        const examiner = await prisma.examiner.findFirst({
            where: {
                staff_code
            }
        })

        if(!examiner) {
            res.status(404).json({
                message: 'Examiner not found'
            })
            return
        }

        const secret = process.env.JWT_SECRET

        const payload = {
            role: 'EXAMINER',
            staff_code: staff_code,
            userId: examiner?.id
        }

        if(secret) {
            const token = jwt.sign(payload, secret)
            res.status(200).json(token)
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const loginAsStudent = async (req: Request, res: Response) => {
    const { registration_number, password } = req.body

    try {
        const student = await prisma.user.findFirst({
            where: {
                registration_number
            }
        })

        if(!student) {
            res.status(404).json({
                message: 'Student not found'
            })
            return
        }

        const validPassword = await argon.verify(student.password, password)

        if(!validPassword) {
            res.status(401).json({
                message: 'Invalid password'
            })
            return
        }

        const secret = process.env.JWT_SECRET

        const payload = {
            role: 'STUDENT',
            registration_number: registration_number,
            userId: student?.id
        }

        if(secret) {
            const token = jwt.sign(payload, secret)
            res.status(200).json(token)
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

export {
    createExaminerAccount,
    createStudentAccount,
    loginAsExaminer,
    loginAsStudent
}