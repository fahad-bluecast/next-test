import Image from "next/image";
import React from "react";

const LeftSideImage = () => {
  return (
    <div className="p-8 md:p-12 flex-1 flex flex-col ">
      {/* Logo */}
      <Image
        src={"/Images/login-image.png"}
        width={462}
        height={500}
        alt="No image"
      />
    </div>
  );
};

export default LeftSideImage;
