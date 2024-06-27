'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import List from "../components/List"
import Select from '../components/Select'
import ArrowLeft from '../components/ArrowLeft'
import { getListOfListsWithIdUser, createListWithName, getUserWithId, addUserToList, removeUserToList } from './actions'


interface ListInterface {
    id: number,
    created_at: string,
    name: string
}
interface User {
    username: string,
    tag: string
}
export default function Home() {
    const router = useRouter()
    const [format, setFormat] = useState('Table')
    const [lists, setLists] = useState<Array<ListInterface>>([])
    const [selectedList, setSelectedList] = useState<ListInterface>()
    const [newListName, setNewListName] = useState<string>('')
    const [user, setUser] = useState<User>()
    const [newUser, setNewUser] = useState<string>('')

    let idUser: string | null = null

    useEffect(() => {
        idUser = localStorage.getItem("user")
        if (idUser == null) { router.push('/log') }
        else {
            getList(Number(idUser))
            getUser(Number(idUser))
        }
    }, [])

    async function getList(id: number) {
        let Lists = await getListOfListsWithIdUser(Number(id))
        let tmp: Array<ListInterface> = []
        Lists?.forEach(e => { tmp.push(e) });
        if (Lists) { setLists(tmp) }
    }
    async function getUser(id: number) {
        let u = await getUserWithId(id)
        if (u) setUser(u)
    }


    async function CreateList(e: any) {
        e.preventDefault()
        if (newListName == '') return
        let newList: ListInterface = await createListWithName(newListName, Number(user?.tag.split('#')[1]))
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












    function disconnect() {
        localStorage.removeItem("user")
        router.push('/log')
    }
    function addUser() {
        if(user && selectedList){
            addUserToList(newUser, selectedList.id)
            setNewUser('')
        }
    }
    async function removeUser(){
        if(user && selectedList){
            let s = await removeUserToList(user.tag, selectedList.id)
            if(s){
                setSelectedList(undefined)
                window.location.reload()
            }
            // getList(Number(idUser))
            // window.location.reload();
        }
    }

    return (
        <>
            <section id='interface'>
                <ArrowLeft func={() => { setSelectedList(undefined) }} />
                <Select
                    array={['Table', 'Cards']}
                    value={format}
                    onChange={(e: any) => setFormat(e)}
                />

                <h3>{selectedList.name}</h3>

                <input type="text" value={newUser} onChange={(e: any) => { setNewUser(e.target.value) }} />
                <button onClick={addUser}>Add</button>  

                {user && <p onClick={() => { navigator.clipboard.writeText(user?.username + user?.tag) }}>{user?.username + user?.tag}</p>}
                <button onClick={removeUser}>Leave List</button>
                <button onClick={disconnect}>Disconnect</button>
            </section>
            <List format={format} list={selectedList} />
        </>
    );
}




