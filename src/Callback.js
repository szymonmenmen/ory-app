import { useEffect } from "react";
import { api } from "./services/axios";
import { useSearchParams } from "react-router-dom";

function Callback() {
  const [searchParams] = useSearchParams();
  const authorize = async (authorizationCode) => {
    try {
      const headers = {
        "Access-Control-Allow-Origin": "*"
      }
      const code_verifier = localStorage.getItem("CODE_VERIFIER");
      api.post(
         "/oauth2/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: authorizationCode,
          client_id: "3521db1d-d51d-46a5-97bd-af364ee07f37",
          code_verifier: code_verifier,
        })
      ,  { headers });
    } catch (ex) {
      window.console.log("ex", ex);
    }
  };
  
  useEffect(() => {
    const authorizationCode = searchParams.get("code");
    authorize(authorizationCode);
  }, []);

  
  return (
    <div className="Callback">
      <label>Authorization in progress</label>
    </div>
  );
}

export default Callback;
