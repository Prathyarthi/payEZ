// import zod from "zod";
// import { User } from "../db";
// import jwt from "jsonwebtoken";
// require('dotenv/config')

// const signupBody = zod.object({
//     username: zod.string().email(),
//     firstName: zod.string(),
//     lastName: zod.string(),
//     password: zod.string()
// })

// router.post("/signup", async (req, res) => {
//     const { success } = signupBody.safeParse(req.body)
//     if (!success) {
//         return res.status(411).json({
//             message: "Email already taken / Incorrect inputs"
//         })
//     }

//     const existingUser = await User.findOne({
//         username: req.body.username
//     })

//     if (existingUser) {
//         return res.status(411).json({
//             message: "Email already taken/Incorrect inputs"
//         })
//     }

//     const user = await User.create({
//         username: req.body.username,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//     })
//     const userId = user._id;

//     const token = jwt.sign({
//         userId
//     }, JWT_SECRET);

//     res.json({
//         message: "User created successfully",
//         token: token
//     })
// })


import zod, { string } from 'zod'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
import { config } from 'dotenv'
import { Account } from '../models/accountModel.js'
config()

const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string(),
})
const signup = async (req, res) => {

    const { email, password, firstName, lastName } = req.body
    const signupValidation = signupSchema.safeParse(req.body)

    if (!signupValidation.success) {
        return res.status(411).send('Invalid Inputs')
    }

    const userExists = await User.findOne({
        email
    })

    if (userExists) {
        return res.status(411).send("User already exists")
    }

    const user = await User.create({
        email,
        password,
        firstName,
        lastName
    })

    if (!user) {
        return res.status(500).send("Server Error")
    }

    const userId = user._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET)

    return res.status(200).json({
        success: true,
        message: "User created successfully",
        token: token
    })
}


const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
})

const signin = async (req, res) => {
    const { email, password } = req.body
    const signinValidation = signinSchema.safeParse(req.body)

    if (!signinValidation.success) {
        return res.status(411).send("Invalid details")
    }

    const userExists = await User.findOne({
        email
    })

    const validPassword = await userExists.comparePassword(password)
    if (!validPassword) {
        return res.status(401).send("Password is incorrect")
    }

    if (!userExists) {
        return res.status(401).send("User doesn't exist")
    }

    const token = jwt.sign({
        userId: userExists._id
    }, process.env.JWT_SECRET)

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token
    })
    return
}


const updateSchema = zod.object({
    password: string().optional(),
    firstName: string().optional(),
    lastName: string().optional()
})

const updateDetails = async (req, res) => {
    const updateParsed = updateSchema.safeParse(req.body)

    if (!updateParsed.success) {
        return res.status(411).send('Invalid data')
    }

    await User.updateOne({
        userId: req.userId
    }, req.body)

    res.status(200).json({
        success: true,
        message: "Updated details successfully",
    })
}

const getUserDetails = async (req, res) => {
    const filter = req.query.filter || ""

    const userDetails = await User.find({
        $or: [{
            firstName: {
                "$regex": filter,
                "$options": 'i'
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options": 'i'
            }
        }]
    })

    res.status(200).json({
        success: true,
        message: "Fetched user details",
        user: userDetails.map((data) => ({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            id: data._id
        }))
    })
    console.log("User Details:", userDetails);
}

export {
    signup,
    signin,
    updateDetails,
    getUserDetails
}