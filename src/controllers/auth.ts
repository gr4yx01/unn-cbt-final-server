import { Request, Response } from "express"
import { prisma } from "../db"
import * as argon from 'argon2'
import { generateStaffCode } from "../helper"
import jwt from 'jsonwebtoken'

const createExaminerAccount = async (req: Request, res: Response) => {
    const { name, department, password } = req.body

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

        const hashedPassword = await argon.hash(password)
        const staff_code = generateStaffCode()

        
        const examiner = await prisma.examiner.create({
            data: {
                name: name,
                department: department,
                password: hashedPassword,
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
            res.status(201).json(token)
        }
        

    } catch (err) {
        res.status(500).json({
            message: 'An error occurred'
        })
    }
}

const createStudentAccount = async (req: Request, res: Response) => {}

const loginAsExaminer = async (req: Request, res: Response) => {}
const loginAsStudent = async (req: Request, res: Response) => {}

export {
    createExaminerAccount,
    createStudentAccount,
    loginAsExaminer,
    loginAsStudent
}