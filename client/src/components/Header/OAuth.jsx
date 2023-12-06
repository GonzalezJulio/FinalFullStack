import React from "react";

export default function OAuth() {
  const handleGitHubClick = async () => {
    // Send a request to the server to initiate the authentication flow.
    const res = await fetch("http://localhost:5173/auth/github", {
      method: "GET",
      credentials: "include",
    });
    // If the server sends back a 200 OK response, redirect the user to GitHub.
    if (res.status === 200) {
      const { url } = await res.json();
      window.location.assign(url);
    } else {
      console.log("Something went wrong");
    }
  }
  return (
    <div>
      <button
        onClick={handleGitHubClick}
        type="button"
        className="bg-red-400 text-white p-3 rounded-lg uppercase hover: opacity-95"
      >
        Continue with GitHub
      </button>
    </div>
  );
}
