import prismaExecute from '../../../prisma/commands'

export default async function Handler(req, res) {
    if(req.method === 'GET') {
        const response = await prismaExecute.read.tasks()
        return res.status(200).json(response)
    } else {
        return res.status(400).json({message: "Fetch error"})
    }
}