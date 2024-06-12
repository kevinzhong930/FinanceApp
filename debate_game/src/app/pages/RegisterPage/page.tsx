'use client';

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import PasswordValidator from '@/app/components/password-validator'

const RegisterPage = () => {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [re_entered_password, setReEnteredPassword] = useState('')

    const [displayPasswordError, setDisplayPasswordError] = useState(false)
    const [displayUsernameError, setDisplayUsernameError] = useState(false)
    const [displayUsernameTakenError, setDisplayUsernameTakenError] = useState(false)

    const submitPasswordValidator = () => {
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
        return regex.test(password)
    }

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 're_entered_password':
                setReEnteredPassword(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = () => {

        setDisplayPasswordError(false)
        setDisplayUsernameError(false)
        setDisplayUsernameTakenError(false)

        if (submitPasswordValidator() && (password === re_entered_password) && (username.length > 0) ) {
            fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.success === false){
                    setDisplayUsernameTakenError(true)
                } else {
                    router.push('/pages/LoginPage')
                }
            })
        } else if (username.length === 0) {
            setDisplayUsernameError(true)
        } else {
            setDisplayPasswordError(true)
        }
    }

    return (
        <div className="w-96 mx-auto mt-35">
            <h1 className="text-center text-xl font-bold">Register</h1>
            <div id="LoginForm" className="flex flex-col items-center">
                <label className="input input-bordered flex items-center gap-2 mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input name="username" type="text" className="grow" placeholder="Username" onChange={handleInputChange} />
                </label>
                {displayUsernameTakenError && <p className="text-red-500">Username already exists!</p>}
                {displayUsernameError && <p className="text-red-500">Username cannot be empty!</p>}
                <label className={`input input-bordered flex items-center gap-2 mt-5 ${displayPasswordError ? 'border-red-500' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input name="password" type="password" className="grow" placeholder="Password" onChange={handleInputChange} />
                </label>
                {displayPasswordError && <p className="text-red-500">Ensure password matches guideline below!</p>}
                <label className={`input input-bordered flex items-center gap-2 mt-5 ${displayPasswordError ? 'border-red-500' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input name="re_entered_password" type="password" className="grow" placeholder="Re-Enter Password" onChange={handleInputChange} />
                </label>

                <PasswordValidator password={password} re_entered_password={re_entered_password}/>

                <button className="btn mt-5" onClick={handleSubmit}>Enter</button>
            </div>
        </div>
    )
}

export default RegisterPage