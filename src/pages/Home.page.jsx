import { useEffect, useState } from "react";
import { readTokensFromUrl } from "../services/readTokensFromUrl";
function HomePage() {
  useEffect(() => {
    const tok = readTokensFromUrl();
    console.log(tok);

    if (tok?.access_token) {
      localStorage.setItem("access_token", tok.access_token);
      if (tok.refresh_token)
        localStorage.setItem("refresh_token", tok.refresh_token);
    } else {
      // sử lí khi đăng nhập rồi mà tải lại trang
    }
  }, []);
  return <div>HomePage</div>;
}

export default HomePage;
