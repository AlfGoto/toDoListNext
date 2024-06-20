import { useState } from 'react'
import Table from './Table'
import Cards from './Cards'


interface ListArg{
    format: string
}
interface RowsInterface {
    name: string,
    status: string,
    user: string,
}
function List(props: ListArg){
    const users: Array<string> = ['Alfred', 'Romain', 'Arnaud', 'Marco']
    const [rows, setRows] = useState<Array<RowsInterface>>([])

    switch(props.format){
        case 'Table': return <Table users={users} rows={rows} setRows={(e:any)=>{setRows(e)}}/>;
        case 'Cards' : return <Cards users={users} rows={rows} setRows={(e:any)=>{setRows(e)}}/>;
    }


    return <><p>Choose a Format</p></>
}

export default List