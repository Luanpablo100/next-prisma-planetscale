import prismaExecute from "../../../prisma/commands";

export default async function Handler(req, res) {
    if(req.method === 'PUT') {
        try {
            const {taskTitle, taskContent} = req.body
            const newTask = await prismaExecute.create.task(taskTitle, taskContent)
            return res.status(200).json(newTask)
        } catch(err) {
            throw err
        }
    } else {
        return res.status(200).json({message: "Fetch error!"})
    }

}