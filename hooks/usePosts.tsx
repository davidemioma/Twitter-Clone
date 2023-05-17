import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const usePosts = (userId?: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    userId ? `/api/posts?userId=${userId}` : "/api/posts",
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default usePosts;
