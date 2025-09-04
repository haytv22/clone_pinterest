import { useEffect, useRef, useState } from "react";
import { UseAuthContext } from "../context/AuthContext";
import { getImgApi, getPinsAPI } from "../services/api.services";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
import { useInfiniteQuery } from "@tanstack/react-query";
function HomePage() {
  const { infoUser } = UseAuthContext();
  const [pins, setPins] = useState();

  const LIMIT = 20;
  const loadMoreRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["pins"],
      queryFn: async ({ pageParam = 0 }) => {
        const from = pageParam * LIMIT;
        const to = from + LIMIT - 1;
        return await getPinsAPI(from, to);
      },
      getNextPageParam: (lastPage, pages) =>
        lastPage.length === LIMIT ? pages.length : undefined,
    });

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const pinsValue = data?.pages.flat();

  return (
    <>
      <div className="2xl:columns-7 xl:columns-5 lg:columns-4 md:columns-3 sm:columns-2 columns-2 gap-4 p-4 ">
        {pinsValue
          ? pinsValue.map((pin) => {
              return (
                <div
                  key={pin.id}
                  className=" mb-4 break-inside-avoid rounded-xl shadow-md overflow-hidden"
                >
                  <Link to={`pin/${pin.id}`}>
                    <img src={pin.image_url} alt={pin.title} />
                  </Link>
                </div>
              );
            })
          : ""}
      </div>
      <div
        ref={loadMoreRef}
        className="w-full flex items-center justify-center"
      >
        {isFetchingNextPage && <Loading />}
        {!hasNextPage && <p>Đã hết ảnh 🚀</p>}
      </div>
    </>
  );
}

export default HomePage;
