import {NextApiRequest, NextApiResponse} from 'next';
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth/next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (req.method === 'GET') {
        try{
            const postId = req.query?.postId as string;
            if (!postId) {
                return res.status(400).json({ message: 'Post ID is required.' });
            }
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                },
                include: {
                    user: true,
                    Comment: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                        include: {
                            user: true,
                        }
                    },
                },
            });
            return res.status(200).json(post);
        }catch (e: any) {
            res.statusMessage = "Error getting post";
            return res.status(500).json(e);
        }
    }

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
