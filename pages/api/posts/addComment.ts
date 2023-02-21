import {NextApiRequest, NextApiResponse} from 'next';
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth/next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (req.method === 'POST') {

        const prismaUser = await prisma.user.findUnique({
            select: {
                id: true,
            },
            where: { email: session?.user?.email || '' }
        });

        //add a comment
        try{
            const { title, postId } = req.body.data;
            if (!session){
                res.statusMessage = "unauthorized";
                return res.status(401).json({ });
            }

            if (title.length > 300){
                res.statusMessage = "write a shorter comment";
                return res.status(400).json({ });

            }

            if(!title){
                res.statusMessage = "write a comment";
                return res.status(400).json({ });
            }

            const result = await prisma.comment.create({
                data:{
                    content: title,
                    userId: prismaUser?.id as string,
                    postId,
                }
            });

            return res.status(200).json(result);
        }catch (e: any) {
            res.statusMessage = e.message;
            return res.status(500).json(e);
        }
    }
}
