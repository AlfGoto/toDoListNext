'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import List from "../components/List"
import Select from '../components/Select'
import { getListOfListsWithIdUser, createListWithName } from './actions'


interface List {
    id: number,
    created_at: string,
    name: string
}
export default function Home() {
    const router = useRouter()
    const [format, setFormat] = useState('Table')
    const [lists, setLists] = useState<Array<List>>([])
    const [selectedList, setSelectedList] = useState<List>()
    const [newListName, setNewListName] = useState<string>('')

    const idUser = localStorage.getItem("user")

    useEffect(() => {
        if (idUser == null) { router.push('/log') }
        else getList(Number(idUser))
    }, [])

    async function getList(id: number) {
        let Lists = await getListOfListsWithIdUser(Number(id))
        let tmp: Array<List> = []
        Lists?.forEach(e => {
            // console.log(e)
            tmp.push(e)
        });
        if (Lists) { setLists(tmp) }
    }

    async function SelectList(e: List) {
        console.log(e)
    }
    async function CreateList(e:any) {
        e.preventDefault()
        let newList: List = await createListWithName(newListName, Number(idUser))
        setLists([...lists, newList])
        setNewListName('')
    }

    if (!selectedList) {
        return <section id='Lists'>
            {lists.map(
                (e: List, key: number) =>
                    <button key={key} onClick={() => { SelectList(e) }}>{e.name}</button>
            )}
            <details>
                <summary>Create New List</summary>
                <form onSubmit={e=>CreateList(e)}>
                    <input type="text" value={newListName} onChange={e => setNewListName(e.target.value)} />
                    <input type="submit" value='Create' />
                </form>
            </details>
        </section>
    }















    function FormatChange(e: any) { setFormat(e) }

    return (
        <>
            <section id='interface'>
                <Select
                    array={['Table', 'Cards']}
                    value={format}
                    onChange={FormatChange}
                />
            </section>
            <List format={format} />
        </>
    );
}
