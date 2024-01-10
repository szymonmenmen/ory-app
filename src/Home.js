import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Home() {
  const [redirectUrl, setRedirectUrl] = useState("");

  // GENERATING CODE VERIFIER
  function dec2hex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
  }

  function generateCodeVerifier() {
    var array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
  }
  function sha256(plain) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  }

  function base64urlencode(a) {
    var str = "";
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  async function generateCodeChallengeFromVerifier(v) {
    var hashed = await sha256(v);
    var base64encoded = base64urlencode(hashed);
    return base64encoded;
  }
  const handleSubmit = async () => {
    const state = generateCodeVerifier();
    console.log("State", state);
    const code_verifier = generateCodeVerifier();
    console.log("Code_verifier", code_verifier);
    localStorage.setItem("CODE_VERIFIER", code_verifier);
    const code_challenge = await generateCodeChallengeFromVerifier(
      code_verifier
    );
    console.log("Code_challenge", code_challenge);
    localStorage.setItem("REDIRECT_URL", redirectUrl);

    window.location.href = `https://strange-mayer-6ttl9at1pm.projects.oryapis.com/oauth2/auth?response_type=code&client_id=3521db1d-d51d-46a5-97bd-af364ee07f37&redirect_uri=${redirectUrl}&state=${state}&scope=openid+user:email&code_challenge_method=S256&code_challenge=${code_challenge}`;
  };

  return (
    <>
      <label>
        redirect_uri:{" "}
        <input
          defaultValue="Callback"
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
        />
      </label>
      <button type="reset">Reset form</button>
      <button onClick={() => handleSubmit()}>Submit</button>
    </>
  );
}

export default Home;
