import { Comment, User } from "@prisma/client";

export type CommentProps = Omit<Comment> & {
  user: User;
};
