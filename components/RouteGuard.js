'use client';

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { readToken } from "@/lib/authenticate";
import { getFavourites } from "@/services/userData";

const PUBLIC_PATHS = ["/register", "/about"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Update atom values for current user
  const updateAtom = async () => {
    const token = readToken();
    if (token) {
      const favs = await getFavourites();
      setFavouritesList(favs);
    }
  };

  useEffect(() => {
    updateAtom(); // ensure atoms are updated on mount

    const token = readToken();
    const path = router.pathname;

    // redirect if accessing protected page without login
    if (!PUBLIC_PATHS.includes(path) && !token) {
      router.push("/login");
    }
  }, [router]);

  return children;
}