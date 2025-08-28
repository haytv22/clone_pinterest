import { useEffect, useState } from "react";
import { UseAuthContext } from "../context/AuthContext";
import { getImgApi } from "../services/api.services";
function HomePage() {
  const { infoUser } = UseAuthContext();
  const [pins, setPins] = useState();

  const getImg = async () => {
    const res = await getImgApi();
    if (res) {
      setPins(res);
    }
  };

  useEffect(() => {
    getImg();
  }, []);

  console.log(pins);

  return <div>chào mừng {infoUser?.email}</div>;
}

export default HomePage;
