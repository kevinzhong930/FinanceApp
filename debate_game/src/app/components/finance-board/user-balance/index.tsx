import React from 'react'

interface UserBalanceProps {
    balance : number
}

const user_balance = ( { balance } : UserBalanceProps) => {
    return (
        <div className="card flex w-96 bg-green-500 shadow-xl">
            <div className ="card-body">
                <div className="text-primary-content text-xl font-bold">Balance :
                    <div className="text-3xl"> 
                        $ {balance} 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default user_balance;