import prisma from "@/lib/prismaDb";
import serverAuth from "@/lib/serverAuth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);

    if (!currentUser) throw new Error("Unauthorised");

    const notifications = await prisma?.notification.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma?.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        hasNotification: false,
      },
    });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(400).end();
  }
}
