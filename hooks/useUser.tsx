import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useUser = (id: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    id ? `/api/users/${id}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useUser;
