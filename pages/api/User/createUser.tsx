// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { type } from 'os';
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
  const { username, firstName, lastName, email, password } = JSON.parse(req.body);
  if (req.headers.referer !== ServerAPI('/User/Signin')) {
    res.status(502).json({
      message: "You are not allowed!",
      type: "error"
    });
    return;
  }

  try {
    const user = await client?.user.create({
      data: {
        username, firstName, lastName, email, password
      }
    });
    res.status(200).json({ user: user, message: "User Created successfully", type: "success" });
  }
  catch (e) {
    //@ts-ignore
    if (e.code === "P2002") {
      res.status(500).json({ "message": "Username already exist!", type: "error" });
    }
    else {
      res.status(500).json({ message: "Some error Occurred!", type: "error" });
    }
  }
}