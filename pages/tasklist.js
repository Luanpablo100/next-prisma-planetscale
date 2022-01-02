import Link from "next/link";
import Container from "../components/Container";

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
        console.log(postData)
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
            <Link href={'/'}><a>Voltar</a></Link>
            <h1 className="text-4xl my-3">Tarefas</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3">
                {tasks.map(task => (
                    <Task task={task} changeChecked={changeChecked}/>
                )
                )}
            </div>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const tasksData = await fetch('http://localhost:3000/api/read/tasks', {
        headers: {
            "Content-Type":"application/json"
        }
    })
    const dbTasks = await tasksData.json()
    return {
      props: {dbTasks}, // will be passed to the page component as props
    }
  }