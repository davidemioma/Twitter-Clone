import React from "react";
import Commentitem from "./Commentitem";
import { CommentProps } from "@/types";

interface Props {
  comments: CommentProps[];
}

const CommentsFeed = ({ comments }: Props) => {
  return (
    <>
      {comments.map((comment) => (
        <Commentitem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentsFeed;
