import prismaExecute from "../../../prisma/commands";

export default async function Handler(req, res) {
    if(req.method === 'POST') {
        try {
            const {taskId, taskTitle, taskContent, isDone} = req.body
            const changeTask = await prismaExecute.update.task(taskId, taskTitle, taskContent, isDone)
            return res.status(200).json(changeTask)
        } catch(err) {
            throw err
        }
    } else {
        return res.status(200).json({message: "Fetch error!"})
    }

}