import { useEffect } from "react";
import { api } from "./services/axios";
import { useSearchParams } from "react-router-dom";

function Callback() {
  const [searchParams] = useSearchParams();
  const authorize = async (authorizationCode) => {
    try {
      const headers = {
        "Content-type": "application/x-www-form-urlencoded"
      }
      const code_verifier = localStorage.getItem("CODE_VERIFIER");
     const redirect_uri=  localStorage.getItem("REDIRECT_URL");
      api.post(
         "/oauth2/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: authorizationCode,
          client_id: "3521db1d-d51d-46a5-97bd-af364ee07f37",
          code_verifier: code_verifier,
          redirect_uri: redirect_uri
        })
      ,  { headers });

    //   api.post(
    //     "/oauth2/token",
    //    new URLSearchParams({
    //      grant_type: "authorization_code",
    //      code: authorizationCode,
    //      client_id: "93b0c7f6-25ab-48bb-9e6f-51122dc6f5d7",
    //      client_secret: "d2WZ3PinV6p~DU~mpP6ClUNkPa",
    //      redirect_uri: redirect_uri
    //    })
    //  ,  { headers });

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
