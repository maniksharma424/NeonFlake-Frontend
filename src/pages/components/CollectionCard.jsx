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
      className="lg:w-1/5  lg:h-[300px] w-[250px] h-[200px] cursor-pointer p-2 border-gray-500 border-[1px] shadow-md rounded-md m-3"
    >
      <div className="w-full h-4/6">
        <img
          src={info?.imageURL}
          className="w-full h-full bg-contain bg-no-repeat rounded-md"
          alt={info?.title}
          srcset=""
        />
      </div>
      <div className="w-full h-2/6">
        <p className="lg:text-[16px] font-[600]  overflow-hidden text-ellipsis whitespace-nowrap h-2/6">
          {info?.title}
        </p>
        <div className="lg:text-[12px] font-[400] text-gray-500  overflow-scroll  h-4/6 flex">
          {info?.description}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
