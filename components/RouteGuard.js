import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { readToken } from "@/lib/authenticate";
import { getFavourites } from "@/services/userData";

// List of public paths that don't require login
const PUBLIC_PATHS = ["/login", "/register", "/about"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Function to update Atom when user is logged in
  const updateAtom = async () => {
    const token = readToken();
    if (token) {
      try {
        const favs = await getFavourites();
        setFavouritesList(favs);
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
        setFavouritesList([]);
      }
    } else {
      setFavouritesList([]);
    }
  };

  useEffect(() => {
    const token = readToken();
    const path = router.pathname;

    updateAtom();

    // Redirect if path is protected and user is not logged in
    if (!PUBLIC_PATHS.includes(path) && !token) {
      router.push("/login");
    }
  }, [router]);

  // While Atom is loading, avoid rendering children
  if (favouritesList === undefined) return null;

  return <>{children}</>;
}