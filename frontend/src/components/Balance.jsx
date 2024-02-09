import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Balance() {

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/accounts/getBalance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                setBalance(res.data.balance);
            })
            .catch(err => {
                console.log(err);
            })
    }, [balance])
    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {balance.toFixed(2)}
            </div>
        </div>
    )
}

export default Balance