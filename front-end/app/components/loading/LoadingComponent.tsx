import React from "react";

export const LoadingComponent = () => {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  />;
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border m-5" role="status"></div>
    </div>
  );
};
