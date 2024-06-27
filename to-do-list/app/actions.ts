'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
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

export async function getListOfListsWithIdUser(id: number) {
    let { data: List_Users, error } = await supabase.from('List_Users').select("*").eq('id_user', id)
    if (error) {
        console.log(error)
        return
    }
    let ids: Array<number> = []
    List_Users?.forEach(e => { ids.push(e.id_list) })
    let { data: List } = await supabase.from('List').select("*").in('id', ids)
    return List
}
export async function createListWithName(name: string, idUser: number) {
    let { data, error } = await supabase.from('List').insert([{ name: name },]).select()
    if (data != null) {
        let dat = await supabase.from('List_Users').insert([{ id_list: data[0].id, id_user: idUser },]).select()
        return data[0]
    }
}
export async function getUserWithId(id: number) {

    let { data: Users, error } = await supabase.from('Users').select("*").eq('id', id)
    if (Users == null) { return false } else {
        let tag = Users[0].id.toString()
        while (tag.length < 4) {
            tag = '0' + tag
        }
        tag = '#' + tag
        return { username: Users[0].username, tag: tag }
    }
}
export async function addUserToList(tag: string, idList: number) {
    let id: number = Number(tag.split('#')[1])
    let username: string = tag.split('#')[0]
    if (id < 1) return

    let { data: Users } = await supabase
        .from('Users')
        .select("*")
        .eq('id', id)
        .eq('username', username)

    if(Users != null && Users.length === 0)return


    let { data: List_Users, error } = await supabase
        .from('List_Users')
        .select("*")
        .eq('id_list', idList)
        .eq('id_user', id)

    if (error) {
        console.log(error)
        return
    }
    if (List_Users && List_Users.length == 0) { const { data } = await supabase.from('List_Users').insert([{ id_list: idList, id_user: id },]).select() }
}

export async function removeUserToList(tag: string, idList: number) {
    let id: number = Number(tag.split('#')[1])
    if (id < 1) return


    const { error } = await supabase
        .from('List_Users')
        .delete()
        .eq('id_list', idList)
        .eq('id_user', id)

    return error ? false : true

}