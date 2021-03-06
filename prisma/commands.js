import moment, { now } from "moment";
import prisma from "../lib/prisma"

const prismaExecute = {
    read: {
        tasks: async () => {
            const tasks = await prisma.task.findMany()

            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return tasks
        },
        task: async (id) => {
            const task = await prisma.task.findUnique({
                where: {
                    id: id
                }
            })

            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return task
        }
    },
    update: {
        isDone: (id, isDone) => {
            const changedTask = prisma.task.update({
                where: {
                    id: id
                },
                data: {
                    isDone: isDone
                }
            })

            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return changedTask
        },
        task: async (id,tasktitle, taskcontent, isDone) => {
            const changedTask = await prisma.task.update({
                where: {
                    id: id
                },
                data: {
                    title: tasktitle,
                    content: taskcontent,
                    // updatedAt: moment(now()).format(),
                    isDone: isDone
                }
            })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return changedTask
        }
    },
    create: {
        task: async (taskTitle, taskContent) => {
            const newTask = await prisma.task.create({
                data: {
                    title: taskTitle,
                    content: taskContent,
                    isDone: false
                }
            })

            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return newTask
        }
    },
    delete: {
        task: async(taskId) => {
            const deletedTask = await prisma.task.delete({
                where: {
                    id: taskId
                }
            })

            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return deletedTask
        }
    }
}

export default prismaExecute;