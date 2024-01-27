import { Account } from "../models/accountModel.js"
import mongoose from 'mongoose'

const getBalance = async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.status(200).json({
        success: true,
        balance: account.balance
    })
} 


const transfer = async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const { amount, to } = req.body

    const fromAccount = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne(
        {
            userId: to
        }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc:
        {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc:
        {
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
}

export {
    getBalance,
    transfer
}