import {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try{
            const result = await prisma.post.findMany({
                include: {
                    user: true,
                    Comment: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
            return res.status(200).json(result);
        }catch (e: any) {
            res.statusMessage = e.message;
            return res.status(500).json(e);
        }
    }
}
