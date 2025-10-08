import React from "react";
import NotFound from "../Components/NotFound";

function Unauthorized() {
  return (
    <NotFound
      particleCount={80}
      particleSize={3}
      animate={true}
      buttonText="Go Back"
      buttonHref="/dashboard"
    />
  );
}

export default Unauthorized;
