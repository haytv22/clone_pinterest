import { useEffect, useState } from "react";
import { readTokensFromUrl } from "../services/readTokensFromUrl";
import { getInfoUserAPI } from "../services/api.services";
import { UseAuthContext } from "../context/AuthContext";
function HomePage() {
  const { infoUser } = UseAuthContext();
  console.log(infoUser);

  useEffect(() => {
    const tok = readTokensFromUrl();

    if (tok?.access_token) {
      localStorage.setItem("access_token", tok.access_token);
      if (tok.refresh_token)
        localStorage.setItem("refresh_token", tok.refresh_token);
    }
  }, []);
  return <div>chào mừng {infoUser.full_name}</div>;
}

export default HomePage;
