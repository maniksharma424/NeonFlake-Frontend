import { uploadData } from "@/util";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RotatingLines } from "react-loader-spinner";

const From = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);
  const videoRef = useRef(null);


  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 50) {
      setTitle(newTitle);
    } else {
      setTitle(newTitle.slice(0, 50));
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= 200) {
      setDescription(newDescription);
    } else {
      setDescription(newDescription.slice(0, 200));
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !image || !video) {
      toast.error("Fill all details");
    } else {
      setLoading(true);
      uploadData(title, description, image, video)
        .then((res) => {
          toast.success(res);
        })
        .then((res) => {
          setLoading(false);
          setTitle("");
          setDescription("");
          imageRef.current.value = null;
          videoRef.current.value = null;
        })
        .catch((err) => {
          toast.success(err);
        });
    }
  };

  return (
    <>
      {loading ? (
        <div className="absolute top-1/2 ">
          <RotatingLines
            strokeColor="black"
            strokeWidth="4"
            animationDuration="0.9"
            width="96"
            visible={true}
          />
        </div>
      ) : null}
      <div
        className={`w-3/4 h-3/4 border-[1px] shadow-xl p-5 flex flex-col justify-around items-start font-monstreat text-[14px ${
          loading ? "opacity-50" : null
        }`}
      >
        <ToastContainer />

        <p>
          Title{" "}
          <span className="text-red-600 relative bottom-1 right-2">*</span>{" "}
          <span className="text-gray-500 text-[10px]">
            {title.length}/50
          </span>
        </p>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full h-[50px] border-[1px] shadow-md rounded-lg p-3"
        />

        <p>
          Description{" "}
          <span className="text-red-600 relative bottom-1 right-2">*</span>
          <span className="text-gray-500 text-[10px]">
            {description.length}/200
          </span>
        </p>
        <input
          type="textarea"
          placeholder="Enter Description"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full h-1/5 border-[1px] shadow-md rounded-lg p-3"
        />

        <p>
          Image<span className="text-red-600 relative bottom-1">*</span>
        </p>
        <input
          ref={imageRef}
          accept=".jpg,.png"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
          className="border-[1px] p-3 w-full"
        />
        <p>
          Video<span className="text-red-600 relative bottom-1">*</span>
        </p>
        <input
          ref={videoRef}
          accept=".mp4,.avi,.mpg"
          onChange={(e) => {
            setVideo(e.target.files[0]);
          }}
          type="file"
          className="border-[1px] p-3 w-full"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#080202] text-white rounded-lg  py-3 lg:font-[800] font-[600] lg:text-[15px] text-[12px] flex justify-center items-center"
        >
          <span>Upload</span>
        </button>
      </div>
    </>
  );
};

export default From;
