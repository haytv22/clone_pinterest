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

  return (
    <div className="2xl:columns-7 xl:columns-5 lg:columns-4 md:columns-3 sm:columns-2 columns-2 gap-4 p-4 ">
      {pins
        ? pins.map((pin) => {
            return (
              <div
                key={pin.id}
                className=" mb-4 break-inside-avoid rounded-xl shadow-md overflow-hidden"
              >
                <img src={pin.image_url} alt={pin.title} />
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default HomePage;
