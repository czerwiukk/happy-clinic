import { User } from "@supabase/supabase-js";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import supabase from "../supabase";

const userAtom = atom<User | null>(null);

export const useUser = () => {
  const [user] = useAtom(userAtom);
  return user;
};

export const useSetupUser = () => {
  const [_, setUser] = useAtom(userAtom);

  const checkUser = useCallback(async () => {
    const response = await supabase.auth.getUser();
    const fetchedUser = response.data.user;
    if (!fetchedUser) {
      setUser(null);
      return;
    }
    setUser(fetchedUser);
  }, []);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", checkUser);
    return () => {
      window.removeEventListener("hashchange", checkUser);
    };
  }, [checkUser]);
};
