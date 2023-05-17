import useUser from "./useUser";
import { toast } from "react-hot-toast";
import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser.followingIds || [];

    return list.includes(userId);
  }, [currentUser.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      let request;

      if (isFollowing) {
        request = () => axios.patch("/api/unfollow", { userId });
      } else {
        request = () => axios.patch("/api/follow", { userId });
      }

      await request();

      mutateCurrentUser();

      mutateFetchedUser();

      toast.success("success");
    } catch (err: any) {
      toast.error(err.response.data.message || "Something went wrong!");
    }
  }, [
    currentUser,
    loginModal,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
