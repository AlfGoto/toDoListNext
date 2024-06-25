'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import List from "../components/List"
import Select from '../components/Select'
import ArrowLeft from '../components/ArrowLeft'
import { getListOfListsWithIdUser, createListWithName } from './actions'


interface ListInterface {
    id: number,
    created_at: string,
    name: string
}
export default function Home() {
    const router = useRouter()
    const [format, setFormat] = useState('Table')
    const [lists, setLists] = useState<Array<ListInterface>>([])
    const [selectedList, setSelectedList] = useState<ListInterface>()
    const [newListName, setNewListName] = useState<string>('')

    let idUser: string | null = null

    useEffect(() => {
        idUser = localStorage.getItem("user")
        if (idUser == null) { router.push('/log') }
        else getList(Number(idUser))
    }, [])

    async function getList(id: number) {
        let Lists = await getListOfListsWithIdUser(Number(id))
        let tmp: Array<ListInterface> = []
        Lists?.forEach(e => {
            // console.log(e)
            tmp.push(e)
        });
        if (Lists) { setLists(tmp) }
    }


    async function CreateList(e: any) {
        e.preventDefault()
        if (newListName == '') return
        let newList: ListInterface = await createListWithName(newListName, Number(idUser))
        setLists([...lists, newList])
        setNewListName('')
    }


    if (!selectedList) {
        return <section id='Lists'>
            <h1>Select a list !</h1>
            <div>
                {lists.map(
                    (e: ListInterface, key: number) =>
                        <button key={key} onClick={() => { setSelectedList(e) }}>{e.name}</button>
                )}
            </div>
            <details>
                <summary>Create New List</summary>
                <form onSubmit={e => CreateList(e)}>
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
                <ArrowLeft func={() => { setSelectedList(undefined) }} />
                <Select
                    array={['Table', 'Cards']}
                    value={format}
                    onChange={FormatChange}
                />
                <h3>{selectedList.name}</h3>
            </section>
            <List format={format} list={selectedList} />
        </>
    );
}




