import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const useAuthToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { exp } = jwtDecode(token);
        const now = Date.now() / 1000;

        if (exp < now) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        } else {
          const msLeft = (exp - now) * 1000;
          setTimeout(checkToken, msLeft + 100);
        }
      } catch (_) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    };

    checkToken();
  }, [navigate]);
};

export default useAuthToken;