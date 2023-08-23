import Router from "next/router";
import React from "react";

const CollectionCard = ({ info }) => {
  return (
    <div
      onClick={() => {
        Router.push({
          pathname: "/View",
          query: {
            title: info?.title,
            description: info?.description,
            imageURL: info?.imageURL,
            videoURL: info?.videoURL,
          },
        });
      }}
      className="lg:w-1/5  lg:h-[300px] w-[150px] h-[200px] cursor-pointer p-2 border-gray-500 border-[1px] shadow-md rounded-md m-3"
    >

      <div className="w-full h-4/6">
        <img
          src={info?.imageURL}
          className="w-full h-full bg-contain bg-no-repeat rounded-md"
          alt={info?.title}
          srcset=""
        />
      </div>

      <p className="lg:text-[16px] font-[600]">{info?.title}</p>
      <p className="lg:text-[12px] font-[400] text-gray-500">{info?.description}</p>
    </div>
  );
};

export default CollectionCard;
