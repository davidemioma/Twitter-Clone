import prisma from "@/lib/prismaDb";
import serverAuth from "@/lib/serverAuth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "PATCH")
    return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);

    if (!currentUser) throw new Error("Unauthorised");

    const { postId } = req.body;

    if (!postId || typeof postId !== "string") throw new Error("Invalid Id!");

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new Error("Post does not exists");

    let newLikeIds = [...(post.likesIds || [])];

    if (req.method === "POST") {
      newLikeIds = [currentUser.id, ...(post.likesIds || [])];

      try {
        if (post?.userId) {
          await prisma.notification.create({
            data: {
              userId: post.userId,
              body: "Someone liked your tweet",
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
    }

    if (req.method === "PATCH") {
      newLikeIds = newLikeIds.filter((id) => id !== currentUser.id);
    }

    await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        likesIds: newLikeIds,
      },
    });

    res.status(200).json("Successful");
  } catch (err) {
    res.status(400).end();
  }
}
