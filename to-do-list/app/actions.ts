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
    let { data: List_Users, error } = await supabase
        .from('List_Users')
        .select("*")
        .eq('id_user', id)
    if (error) {
        console.log(error)
        return
    }
    let ids: Array<number> = []
    List_Users?.forEach(e => { ids.push(e.id_list) })
    let { data: List } = await supabase
        .from('List')
        .select("*")
        .in('id', ids)
    return List
}
export async function createListWithName(name: string, idUser: number) {
    console.log(name, idUser)

    let { data, error } = await supabase
        .from('List')
        .insert([
            { name: name },
        ])
        .select()
    console.log(data)
    if (data != null) {
        let dat = await supabase
            .from('List_Users')
            .insert([
                { id_list: data[0].id, id_user: idUser },
            ])
            .select()


        return data[0]
    }

}