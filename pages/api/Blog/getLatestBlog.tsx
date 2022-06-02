// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Article, Tag } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';
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
    if (req.method === "POST") {
        res.status(502).json({
            message: "Connot Proccess in POST!",
            type: "error"
        })
        return;
    }
    try {
        const article = (await client.article.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                tags:true
            }
        }))[0];

        res.status(200).json({ article, message: "Your Article", type: "success" });
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Some error Occurred!", type: "error" });
    }
}