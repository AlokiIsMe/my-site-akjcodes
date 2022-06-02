// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ServerAPI } from '../../../consts/Variables'
import { client } from "../prismaService"

type Data = {
    user?: User
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

    if (req.headers.referer !== ServerAPI('/User/Login')) {
        res.status(502).json({
            message: "You are not allowed!",
            type: "error"
        });
        return;
    }

    const { username, password } = JSON.parse(req.body);


    try {
        const user = await client.user.findUnique({
            where: {
                username: username
            }
        }) ;

        if (!user){
            res.status(200).json({message:"User Does not Exist",type:"error"});
        }
        else if (user?.password === password) {
            res.status(200).json({ user: user, message: "Logged In successfully", type: "success" });
        }
        else {
            res.status(200).json({
                type: "error",
                message: "Incorrect Password!"
            });
        }

    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Some error Occurred!", type: "error" });
    }
}