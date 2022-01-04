import Link from "next/link";
import Router from "next/router";

import Container from '../../components/Container'

import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { FiTrash2, FiSave } from 'react-icons/fi'

import { useEffect, useState, Fragment } from "react";

import { Dialog, Transition } from '@headlessui/react'

import moment from 'moment'

import prismaExecute from '../../prisma/commands'

export default function Home({dbtask}) {
    const [task, setTask] = useState(dbtask)

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
        Router.push('/tasklist')
      }

      function openModal() {
        setIsOpen(true)
      }

      function MyModal() {

        return (
            <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
                >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                    >
                    &#8203;
                    </span>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                        >
                        Tarefa apagada!
                        </Dialog.Title>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Redirecionando para a lista.
                        </p>
                        </div>

                        <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={closeModal}
                        >
                            Entendido!
                        </button>
                        </div>
                    </div>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition>
            </>
        )
    }

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

    async function deleteTask() {
        const taskId = task.id
        const deleteData = {taskId: taskId}
        const deletedTask = await fetch('/api/delete/task', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify(deleteData)
        })

        openModal()
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
                <FiTrash2 size={40} className="cursor-pointer hover:text-red-500" onClick={deleteTask}/>
                <FiSave size={40} className="cursor-pointer hover:text-green-500" onClick={updateTask}/>
                {task.isDone ? <ImCheckboxChecked size={40} className="cursor-pointer" onClick={() => changeChecked(task.id, task.isDone)}/>: <ImCheckboxUnchecked size={40} className="cursor-pointer"  onClick={() => changeChecked(task.id, task.isDone)}/>}
            </div>
        </div>
        {MyModal()}
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
