import React from "react";

const Loader= () => {
  return (
    <div className="text-center py-5">
      <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
