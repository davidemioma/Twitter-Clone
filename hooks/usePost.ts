import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const usePost = (postId: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    postId ? `/api/posts/${postId}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default usePost;
