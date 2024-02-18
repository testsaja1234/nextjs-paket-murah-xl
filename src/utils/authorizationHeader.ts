import Cookies from "js-cookie";

export function authorizationHeader() {
  const currentUser = Cookies.get("currentUser");

  return {
    Authorization: `Bearer ${JSON.parse(currentUser || "")?.accessToken || ""}`,
  };
}
