import React,{useState, useEffect} from 'react'

type PasswordData = {
    password : string,
    re_entered_password : string,
}

const PasswordValidator = ({password, re_entered_password} : PasswordData) => {
    const [eightCharsLong, setEightCharsLong] = useState(false)
    const [oneUpperChar, setOneUpperChar] = useState(false)
    const [oneLowerChar, setOneLowerChar] = useState(false)
    const [oneLetter, setOneLetter] = useState(false)
    const [oneNumber, setOneNumber] = useState(false)
    const [oneSpecialChar, setOneSpecialChar] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(false)

    const eightCharsLongRegex = new RegExp('(?=.{8,})')
    const oneUpperCharRegex = new RegExp('(?=.*[A-Z])')
    const oneLowerCharRegex = new RegExp('(?=.*[a-z])')
    const oneLetterRegex = new RegExp('(?=.*[A-Za-z])')
    const oneNumberRegex = new RegExp('(?=.*[0-9])')
    const oneSpecialCharRegex = new RegExp('(?=.*[!@#$%^&*])')

    const checkPassword = () => {
        setEightCharsLong(eightCharsLongRegex.test(password))
        setOneUpperChar(oneUpperCharRegex.test(password))
        setOneLowerChar(oneLowerCharRegex.test(password))
        setOneLetter(oneLetterRegex.test(password))
        setOneNumber(oneNumberRegex.test(password))
        setOneSpecialChar(oneSpecialCharRegex.test(password))
        setPasswordsMatch(password === re_entered_password)
    }

    useEffect(() => {
        checkPassword()
    }, [password, re_entered_password])

    return (
        <div id="password_validator" className="mt-5">
            <div id="8charsLong">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${eightCharsLong ? 'bg-green-500' : 'bg-red-500'}`}></span>
                Eight Characters Long
            </div>
            <div id="1UpperChar">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${oneUpperChar ? 'bg-green-500' : 'bg-red-500'}`}></span>
                One Uppercase Letter
            </div>
            <div id="1LowerChar">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${oneLowerChar ? 'bg-green-500' : 'bg-red-500'}`}></span>
                One Lowercase Letter
            </div>
            <div id="1Letter">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${oneLetter ? 'bg-green-500' : 'bg-red-500'}`}></span>
                One Letter
            </div>
            <div id="1Number">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${oneNumber ? 'bg-green-500' : 'bg-red-500'}`}></span>
                One Number
            </div>
            <div id="1SpecialChar">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${oneSpecialChar ? 'bg-green-500' : 'bg-red-500'}`}></span>
                One Special Character
            </div>
            <div id="PasswordsMatch">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${passwordsMatch ? 'bg-green-500' : 'bg-red-500'}`}></span>
                Passwords Match
            </div>
        </div>
    )
}

export default PasswordValidator