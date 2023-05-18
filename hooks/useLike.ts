import { toast } from "react-hot-toast";
import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import usePost from "./usePost";
import usePosts from "./usePosts";

interface Props {
  postId: string;
}

const useLike = ({ postId }: Props) => {
  const { data: currentUser } = useCurrentUser();

  const { data: post, mutate: mutateFetchedPost } = usePost(postId);

  const { mutate: mutateFetchedPosts } = usePosts();

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = post?.likesIds || [];

    return list.includes(currentUser?.id);
  }, [post?.likesIds, currentUser?.id]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      let request;

      if (hasLiked) {
        request = () => axios.patch("/api/like", { postId });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();

      mutateFetchedPost();

      mutateFetchedPosts();

      toast.success("success");
    } catch (err: any) {
      toast.error(err.response.data.message || "Something went wrong!");
    }
  }, [
    currentUser,
    loginModal,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
