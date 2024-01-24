import { Account } from "../models/accountModel.js"

const getBalance = async (req, res) => {
    const details = Account.findOne({
        userId: req._id
    })

    res.status(200).json({
        success: true,
        balance: details.balance
    })
}

export {
    getBalance
}