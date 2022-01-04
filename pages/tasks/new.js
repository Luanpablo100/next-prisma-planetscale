import Container from "../../components/Container";
import Link from "next/link";
import Router from "next/router";

import { FiSave } from 'react-icons/fi'



import { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'


export default function Home() {
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
                        Tarefa criada!
                        </Dialog.Title>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Volte para a lista para ver.
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

    async function createTask() {
        const taskTitle = document.getElementById('input-title').value
        const taskContent = document.getElementById('input-content').value
        const putData = {taskTitle: taskTitle, taskContent:taskContent}
        
        const createdTask = await fetch('/api/create/task', {
            headers: {
                'Content-Type': "application/json",
            },
            method: "PUT",
            body: JSON.stringify(putData)
            }
        )
        
        openModal()
    }

    return (

        <Container>
        <div className="mb-3">
            <Link href={'/tasklist'}><a className="text-2xl hover:underline underline-offset-2">Voltar</a></Link>
         </div>
        <div className="mx-4 md:w-1/2 break-words border border-white rounded p-4"> 
            <form onSubmit={createTask}>
                <input className="bg-transparent focus:outline-none text-4xl h-full w-full border-b-2 border-bottom-white mb-2" id="input-title"/>
                <textarea className="bg-transparent w-full h-full text-xl focus:outline-none" rows="5" id="input-content">
                </textarea>
            </form>
            <div className="flex w-full justify-evenly">
                <FiSave size={40} className="cursor-pointer hover:text-green-500" onClick={createTask}/>
            </div>
        </div>
        {MyModal()}
     </Container>
    )
}