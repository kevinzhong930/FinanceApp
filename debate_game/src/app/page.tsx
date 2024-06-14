'use client';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()

  const [userId , setUserId] = useState('')
  const [userName, setUserName] = useState('')

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
      }
    })
  }, [])

  useEffect(() => {
    console.log(userId)
  }, [userId])


  return (
    <main>
      <h1>Welcome back, {userName}!</h1>
    </main>
  );
}
