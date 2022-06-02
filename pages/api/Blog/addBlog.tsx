// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Article, Tag } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';
import { ServerAPI } from '../../../consts/Variables'
import { client } from "../prismaService"

type Data = {
    article?: Article & {
        tags: Tag[];
    } | null,
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
    const { username, title, desc, content, tags } = JSON.parse(req.body);
    // if (req.headers.referer !== ServerAPI('/Blogs/'+blogId)) {
    //     res.status(502).json({
    //         message: "You are not allowed!",
    //         type: "error"
    //     });
    //     return;
    // }
    if (content === "" || title === "") {
        res.status(200).json({
            message: "Please enter valid text!",
            type: "error"
        });
        return;
    };

    try {
        let LTags = tags as Tag[];
        const article = await client.article.create({
            data: {
                content, desc, title, username, tags: {
                    connect: LTags
                }
            },
            include: {
                tags: true
            },
        });

        res.status(200).json({ article, message: "Article Added successfully", type: "success" });
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Some error Occurred!", type: "error" });
    }
}