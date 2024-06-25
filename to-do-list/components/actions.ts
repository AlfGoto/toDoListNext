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

export async function createRow(idList: number, add: RowsInterface) {


    const { data, error } = await supabase
        .from('Rows')
        .insert([
            { id_list: idList, name: add.name, status: add.status, id_user: add.user },
        ])
        .select()
    if (error) console.log(error)
    return data

}

interface Result {
    name: string,
    id: number
}
export async function getUsersOfList(id: number) {
    let { data: List_Users } = await supabase
        .from('List_Users')
        .select("*")
        .eq('id_list', id)


    let ids: Array<number> = []
    List_Users?.forEach(e => {
        ids.push(Number(e.id_user))
    })


    let { data: Users, error } = await supabase
        .from('Users')
        .select("*")
        .in('id', ids)

    if (error) console.log(error)

    let result: Array<Result> = []
    Users?.forEach(e => {
        result.push({ name: e.username, id: e.id })
    })
    return result

}

interface RowsInterface {
    name: string,
    status: string,
    user: string,
    id?: number
}
export async function getRowsByListId(id: number) {

    let { data: Rows, error } = await supabase
        .from('Rows')
        .select("*")
        .eq('id_list', id)


    if (error) console.log(error)
    console.log(Rows)
    let result: Array<RowsInterface> = []
    Rows?.forEach(e => { result.push({ name: e.name, status: e.status, user: e.id_user, id: e.id }) })
    return result
}

export async function deleteRowWithId(id: number) { const { error } = await supabase.from('Rows').delete().eq('id', id) }
export async function updateUserWithId(id: number, user: number) { const { data, error } = await supabase.from('Rows').update({ id_user: user }).eq('id', id).select() }
export async function updateStatusWithId(id: number, status: string) { const { data, error } = await supabase.from('Rows').update({ status: status }).eq('id', id).select() }
export async function updateNameWithId(id: number, name: string) { const { data, error } = await supabase.from('Rows').update({ name: name }).eq('id', id).select() }