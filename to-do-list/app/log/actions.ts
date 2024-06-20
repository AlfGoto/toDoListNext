'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
var sha256 = require('js-sha256');

const cookieStore = cookies()

const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value
            },
        },
    }
)





interface LogArg {
    username: string,
    password: string
}

export async function login(arg: LogArg) {
    arg.password = sha256(arg.password)
    console.log(arg)

    let { data: Users, error } = await supabase
        .from('Users')
        .select("*")
        .eq('username', arg.username)
        .eq('password', arg.password)


    if (Users.length == 1) {
        console.log(true)
        return true

    }else{
        let str: string = 'Your credentials does not match our system'
        console.log(str)
        return str
    }

}

export async function register(arg: LogArg) {
    arg.password = sha256(arg.password)
    console.log(arg)


    let { data: Users, error } = await supabase
        .from('Users')
        .select("*")
        .eq('username', arg.username)


    if (Users.length == 0) {

        const { data, error } = await supabase
            .from('Users')
            .insert([
                arg,
            ])
            .select()

            return  true

    }else{
        console.log('already a user')
        let str: string = 'Username already taken'
        return str
    }

}