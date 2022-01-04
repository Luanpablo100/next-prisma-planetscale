import prismaExecute from "../../../prisma/commands";

export default async function Handler(req, res) {
    if(req.method === 'DELETE') {
        try {
            const {taskId} = req.body
            const deletedTask = await prismaExecute.delete.task(taskId)
            return res.status(200).json(deletedTask)
        } catch(err) {
            throw err
        }
    } else {
        return res.status(200).json({message: "Fetch error!"})
    }

}