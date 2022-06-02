// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Comment } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';
import { ServerAPI } from '../../../consts/Variables'
import { client } from "../prismaService"
type Data = {
    comment?: Comment,
    message: string
    type: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        res.status(502).json({
            message: "Connot Proccess in GET!",
            type: "error"
        })
        return;
    }
    const { username, blogId, content } = JSON.parse(req.body);
    // if (req.headers.referer !== ServerAPI('/Blogs/'+blogId)) {
    //     res.status(502).json({
    //         message: "You are not allowed!",
    //         type: "error"
    //     });
    //     return;
    // }
    if (content === ""){
        res.status(200).json({
            message:"Please enter valid text!",
            type:"error"
        });
        return;
    };

    try {
        const comment = await client.comment.create({
            data: {
                username: username,
                blogId: blogId,
                content,
                createdAt: new Date()
            },
        });

        res.status(200).json({ comment: comment, message: "Comment Posted successfully", type: "success" });
    }
    catch (e) {
        res.status(500).json({ message: "Some error Occurred!", type: "error" });
    }
}