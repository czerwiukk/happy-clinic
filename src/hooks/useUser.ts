import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo } from "react";
import supabase from "../supabase";
import { useQuery } from "react-query";
import { queryClient } from "../main";

export const useUser = () => {
  const { data, isLoading } = useQuery(["user"], () => supabase.auth.getUser());
  const user = useMemo(() => data?.data.user, [data]);

  return { user, loadingUser: isLoading };
};

export const useSetupUser = () => {
  useEffect(() => {
    const listener = () => {
      queryClient.refetchQueries({ queryKey: ["user"] });
    };
    window.addEventListener("hashchange", listener);
    return () => {
      window.removeEventListener("hashchange", listener);
    };
  }, []);
};
