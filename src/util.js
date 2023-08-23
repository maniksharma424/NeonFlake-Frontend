export const uploadData = async (title, description, image, video) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Upload image
      const imageFormData = new FormData();
      imageFormData.append("file", image);
      imageFormData.append("upload_preset", "s8ajszzz");

      const imageResponse = await fetch(
        "https://api.cloudinary.com/v1_1/du19shvhf/image/upload",
        {
          method: "POST",
          body: imageFormData,
        }
      );
      const imageData = await imageResponse.json();
      const imageSecureUrl = imageData.secure_url;

      // Upload video
      const videoFormData = new FormData();
      videoFormData.append("file", video);
      videoFormData.append("upload_preset", "s8ajszzz");

      const videoResponse = await fetch(
        "https://api.cloudinary.com/v1_1/du19shvhf/video/upload",
        {
          method: "POST",
          body: videoFormData,
        }
      );
      const videoData = await videoResponse.json();
      const videoSecureUrl = videoData.secure_url;

      // Upload to server
      const requestData = {
        title: title,
        description: description,
        imageURL: imageSecureUrl,
        videoURL: videoSecureUrl,
      };

      const thumbnailUploadResponse = await fetch(
        "https://neonflake-server.onrender.com/api/thumbnails/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (thumbnailUploadResponse.ok) {
        resolve("Uploaded successfully!");
      } else {
        reject("Error uploading data to the server.");
      }
    } catch (error) {
      reject(error);
    }
  });
};
