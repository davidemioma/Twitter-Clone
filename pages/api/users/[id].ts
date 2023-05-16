import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") throw new Error("Invalid Id!");

    const user = await prisma?.user.findUnique({
      where: {
        id,
      },
    });

    const followersCount = await prisma?.user.count({
      where: {
        followingIds: {
          has: id,
        },
      },
    });

    res.status(200).json({ ...user, followersCount });
  } catch (err) {
    res.status(400).end();
  }
}
