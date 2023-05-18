import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") throw new Error("Invalid Id!");

    const post = await prisma?.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(400).end();
  }
}
