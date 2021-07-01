import React from "react";

const MyFooter = () => {
  return (
    <div>
      <p className="text-center mt-4">
        {new Date().getFullYear()} copyright &copy;
      </p>
    </div>
  );
};

export default MyFooter;
