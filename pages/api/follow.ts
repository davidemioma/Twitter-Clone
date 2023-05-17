import prisma from "@/lib/prismaDb";
import serverAuth from "@/lib/serverAuth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);

    if (!currentUser) throw new Error("Unauthorised");

    const { userId } = req.body;

    if (!userId || typeof userId !== "string") throw new Error("Invalid Id!");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User does not exists");

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: [user.id, ...(currentUser.followingIds || [])],
      },
    });

    res.status(200).json("Successful");
  } catch (err) {
    res.status(400).end();
  }
}
