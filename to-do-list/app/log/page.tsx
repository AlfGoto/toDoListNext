'use client'

import { useState } from 'react'
import { login, register } from './actions'
import { useRouter } from 'next/navigation'

interface Result{
    state: boolean,
    data: any
}



export default function Log() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')



    async function Login() {
        if (username == '' || password == '') {
            setErrorMsg('You need a password and an username')
        }else{
            let data = { username: username, password: password }
            let result: Result = await login(data)
            if(result.state === true){
                window.localStorage.setItem("user", result.data);
                router.push('/')
            }else{
                setErrorMsg(result.data)
            }
        }
    }


    async function Register() {
        if (username == '' || password == '') {
            setErrorMsg('You need a password and an username')
        }else{
            let data = { username: username, password: password }
            let result: any = await register(data)
            if(result.state === true){
                localStorage.setItem("user", result.data);
                router.push('/')
            }else{
                setErrorMsg(result.data)
            }
        }
    }

    return (
        <form onSubmit={e => { e.preventDefault() }} id='LoginDIV'>
            <p>{errorMsg}</p>
            <input type="text" value={username} onChange={e => { setUsername(e.target.value) }}  placeholder='Username'/>
            <input type="password" value={password} onChange={e => { setPassword(e.target.value) }}  placeholder='Password'/>
            <button onClick={Login}>Login</button>
            <button onClick={Register}>Register</button>
        </form>
    )
}