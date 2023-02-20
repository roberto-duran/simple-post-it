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

       //get aut  post
        try{
            if (!session){
                res.statusMessage = "unauthorized";
                return res.status(401).json({ });
            }
           const result = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email || '' ,
                },
                include: {
                    Post: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                        include: {
                            Comment: true,
                        }
                    },
                }
           });

            return res.status(200).json(result);
        }catch (e: any) {
            res.statusMessage = e.message;
            return res.status(500).json(e);
        }
    }
}
