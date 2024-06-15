'use client';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';

import UserBalance from '@/app/components/finance-board/user-balance';

export default function Home() {
  const router = useRouter()

  const [userId , setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    fetch ('/api/check_login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn === false) {
        router.push('/pages/LoginPage')
      } else {
        setUserId(data.userId)
        setUserName(data.userName)
        
        if (data.balance) {
          setBalance(data.balance)
        }

      }
    })
  }, [])

  return (
    <main>
      <div id="welcome_header" className="flex text-5xl font-bold ml-20 mt-20">
        Welcome back, 
        <div className="text-info"> 
          {userName} 
        </div> 
        !
      </div>

      <div id="finance_board" className="mt-10">
        <UserBalance balance={balance} />
      </div>
    </main>
  );
}
