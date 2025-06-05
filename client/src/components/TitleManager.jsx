import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import routes from "../router/RoutesConfig";

function findTitle(pathname) {
  for (const route of routes) {
    if (route.children) {
      for (const child of route.children) {
        const fullPath = route.path + (child.path ? "/" + child.path : "");
        if (pathname === fullPath || pathname === route.path) {
          return child.title || "SST";
        }
      }
    } else if (route.path === pathname) {
      return route.title || "SST";
    }
  }
  return "SST";
}

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const title = findTitle(location.pathname);
    document.title = title;
  }, [location]);

  return null;
}

export default TitleManager;
