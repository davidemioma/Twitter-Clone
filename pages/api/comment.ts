import prisma from "@/lib/prismaDb";
import serverAuth from "@/lib/serverAuth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);

    if (!currentUser) throw new Error("Unauthorised");

    const { postId } = req.query;

    const { body } = req.body;

    if (!postId || typeof postId !== "string") throw new Error("Invalid Id!");

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new Error("Post does not exists");

    await prisma.comment.create({
      data: {
        postId: post.id,
        userId: currentUser.id,
        body,
      },
    });

    try {
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            userId: post.userId,
            body: "Someone replied on your tweet",
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }

    res.status(200).json("Comment added successful");
  } catch (err) {
    res.status(400).end();
  }
}
