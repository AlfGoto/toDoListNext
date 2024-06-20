'use client'

import { useState } from 'react'
import { login, register } from './actions'
import { useRouter } from 'next/navigation'

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
            let result: string | boolean = await login(data)
            if(result === true){
                router.push('/')
            }else{
                setErrorMsg(result)
            }
        }
    }


    async function Register() {
        if (username == '' || password == '') {
            setErrorMsg('You need a password and an username')
        }else{
            let data = { username: username, password: password }
            let result: string | boolean = await register(data)
            if(result === true){
                router.push('/')
            }else{
                setErrorMsg(result)
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