import { UseAuthContext } from "../context/AuthContext";
function HomePage() {
  const { infoUser } = UseAuthContext();

  return <div>chào mừng {infoUser?.email}</div>;
}

export default HomePage;
