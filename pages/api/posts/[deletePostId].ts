import {NextApiRequest, NextApiResponse} from 'next';
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth/next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (req.method === 'DELETE') {

        try{
            if (!session){
                res.statusMessage = "unauthorized";
                return res.status(401).json({ });
            }

            const deletePostId = req.query?.deletePostId as string;

            if (!deletePostId) {
                return res.status(400).json({ message: 'Post ID is required.' });
            }

            const result = await prisma.post.delete({
                where: {
                    id: deletePostId,
                }
            });
            return res.status(200).json(result);
        }catch (e: any) {
            res.statusMessage = e.message;
            return res.status(500).json(e);
        }
    }
}
