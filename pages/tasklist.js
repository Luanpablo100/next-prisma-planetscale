import Link from "next/link";
import Container from "../components/Container";

import moment from "moment";

import prismaExecute from "../prisma/commands";

import { useState } from "react";

import Task from "../components/Task";

export default function Home({dbTasks}) {
    const [tasks, setTasks] = useState(dbTasks)

    function changeChecked(taskId, isDone) {
        const newTasks = tasks.map(task => {
            if (task.id === taskId) return {...task, isDone: !task.isDone}
            return task
        })

        const postData = {taskId: taskId, isDone: isDone}
        fetch('/api/update/isDone', {
            headers: {
                'Content-Type': "application/json",
            },
            method: "POST",
            body: JSON.stringify(postData)
        })

        setTasks(newTasks)
    }

    return (
        <Container>
            <Link href={'/'}><a className="hover:underline underline-offset-2">Voltar</a></Link>
            <h1 className="text-4xl my-3">Tarefas</h1>
            <div className="mb-3">
                <Link href={'/tasks/new'}><a><button className="bg-indigo-700 px-8 py-2 rounded-md shadow border-2 border-white hover:bg-indigo-800">+ Tarefa</button></a></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3">
                {tasks.map(task => (
                    <Task task={task} changeChecked={changeChecked} key={task.id}/>
                )
                )}
            </div>
        </Container>
    )
}

export async function getServerSideProps() {
    const oldDbTasks = await prismaExecute.read.tasks()
    const dbTasks = oldDbTasks.map(task => {
        return {
            id: task.id,
            createdAt: moment(task.createdAt).format("DD/MM/YYYY"),
            updatedAt: moment(task.updatedAt).format("DD/MM/YYYY"),
            title: task.title,
            content: task.content,
            isDone: task.isDone
        }
    })
    return {
      props: {dbTasks}, // will be passed to the page component as props
    }
  }