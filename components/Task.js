import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'

import Link from 'next/link'

export default function Task({task, changeChecked}) {
    return (
            <div className="text-left bg-gradient-to-r from-indigo-700 to-orange-500 hover:bg-gradient-to-br from-indigo-700 to-orange-500 p-3 rounded flex justify-between items-center cursor-pointer">
                <Link href={`/tasks/${task.id}`}>
                    <div>
                        <h1 className="text-2xl">{task.title}</h1>
                        <p>{task.content}</p>
                    </div>
                </Link>
                <div className="ml-2">
                    {task.isDone ? <ImCheckboxChecked size={40} className="cursor-pointer" onClick={() => changeChecked(task.id, task.isDone)}/>: <ImCheckboxUnchecked size={40} className="cursor-pointer"  onClick={() => changeChecked(task.id, task.isDone)}/>}
                </div>
            </div>

        )
}