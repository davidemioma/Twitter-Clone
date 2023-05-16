import bcrypt from "bcrypt";
import prisma from "@/lib/prismaDb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { name, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        hashedPassword,
      },
    });

    res.status(201).json("New user created!");
  } catch (err) {
    res.status(400).end();
  }
}
