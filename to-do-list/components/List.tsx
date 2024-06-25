import { useEffect, useState } from 'react'
import Table from './Table'
import Cards from './Cards'
import { getUsersOfList, getRowsByListId } from './actions'


interface ListArg {
    format: string,
    list: List,
}
interface users {
    id: number,
    name: string
}
interface List {
    id: number,
    created_at: string,
    name: string
}
interface RowsInterface {
    name: string,
    status: string,
    user: string,
    id?: number
}
function List(props: ListArg) {
    // const users: Array<string> = ['Alfred', 'Romain', 'Arnaud', 'Marco']
    const [users, setUsers] = useState<Array<any>>([])
    const [rows, setRows] = useState<Array<RowsInterface>>([])

    useEffect(() => {
        getUsers()
        getRows()
    }, [])

    async function getUsers() { setUsers(await getUsersOfList(props.list.id)) }
    async function getRows() { setRows(await getRowsByListId(props.list.id)) }



    switch (props.format) {
        case 'Table': return <Table id={props.list.id} users={users} rows={rows} setRows={(e: any) => { setRows(e) }} />;
        case 'Cards': return <Cards id={props.list.id} users={users} rows={rows} setRows={(e: any) => { setRows(e) }} />;
    }


    return <><p>Choose a Format</p></>
}

export default List