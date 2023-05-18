import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useNotifications = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/notifications",
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useNotifications;
