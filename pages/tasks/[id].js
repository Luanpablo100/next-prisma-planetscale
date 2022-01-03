import Link from "next/link";

import Container from '../../components/Container'

import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { FiTrash2, FiSave } from 'react-icons/fi'

import { useEffect, useState } from "react";

import moment from 'moment'

import prismaExecute from '../../prisma/commands'

export default function Home({dbtask}) {
    const [task, setTask] = useState(dbtask)

    useEffect(() => {
        const inputTitle = document.getElementById('input-title');
        const inputtContent = document.getElementById('input-content');
        inputTitle.value = task.title
        inputtContent.value = task.content
    })

    async function updateTask(event) {
        event.preventDefault()
        const titleValue = document.getElementById('input-title').value
        const contentValue = document.getElementById('input-content').value
        const postData = {taskId:task.id, taskTitle:titleValue, taskContent:contentValue, isDone:task.isDone}
        const updatedTaskData = await fetch('/api/update/task', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(postData)
        })
        const updatedTask = await updatedTaskData.json()
        setTask(updatedTask)
    }

    function changeChecked(taskId, isDone) {
        const postData = {taskId: taskId, isDone: isDone}
        fetch('/api/update/isDone', {
            headers: {
                'Content-Type': "application/json",
            },
            method: "POST",
            body: JSON.stringify(postData)
        })

        setTask({...task, isDone: !isDone})
    }

 return (
     <Container>
         <div className="mb-3">
            <Link href={'/tasklist'}><a className="text-2xl hover:underline underline-offset-2">Voltar</a></Link>
         </div>
        <div className="mx-4 md:w-1/2 break-words border border-white rounded p-4"> 
            <form onSubmit={updateTask}>
                <input className="bg-transparent focus:outline-none text-4xl h-full w-full border-b-2 border-bottom-white mb-2" id="input-title"/>
                <textarea className="bg-transparent w-full h-full text-xl focus:outline-none" rows="5" id="input-content">
            </textarea>
            </form>
            <div className="flex w-full justify-evenly">
                <FiTrash2 size={40} className="cursor-pointer hover:text-red-500"/>
                <FiSave size={40} className="cursor-pointer hover:text-green-500" onClick={updateTask}/>
                {task.isDone ? <ImCheckboxChecked size={40} className="cursor-pointer" onClick={() => changeChecked(task.id, task.isDone)}/>: <ImCheckboxUnchecked size={40} className="cursor-pointer"  onClick={() => changeChecked(task.id, task.isDone)}/>}
            </div>
        </div>
     </Container>
 )
}

export async function getServerSideProps(context) {
    const oldTask = await prismaExecute.read.task(parseInt(context.params.id))
    const dbtask = {
        id: oldTask.id,
        createdAt: moment(oldTask.createdAt).format("DD/MM/YYYY"),
        updatedAt: moment(oldTask.updatedAt).format("DD/MM/YYYY"),
        title: oldTask.title,
        content: oldTask.content,
        isDone: oldTask.isDone
    }
    return {
      props: {dbtask}, // will be passed to the page component as props
    }
  }
