import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser?.profilePicture);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  console.log(imageFileUploadProgress, imageFileUploadError);
  const filePickerRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  console.log(imageFile, imageFileUrl);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // const uploadImage = async () => {
  //     rules_version = '2';
  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if
  //         request.resource.size < 3 * 1024 * 1024 &&
  //         request.resource.contentType.matches('image/.*');
  //     }
  //   }
  // }
  // console.log("uploading image...");
  // const storage = getStorage(app);
  // const fileName = new Date().getTime() + imageFile.name;
  // const storageRef = ref(storage, fileName);
  // const uploadTask = uploadBytesResumable(storageRef, imageFile);
  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  //     const progress =
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     setImageFileUploadProgress(progress.toFixed(0));
  //   },
  // (error) => {
  //   console.log("error uploading image", error);
  //   setImageFileUploadError(
  //     "Could not upload image (file must be less than 3MB)",
  //   );
  // },
  //     (error) => {
  //       console.log("Full Error:", error);
  //       console.log("Error Code:", error.code);
  //       console.log("Error Message:", error.message);

  //       setImageFileUploadError(error.message);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setImageFileUrl(downloadURL);
  //       });
  //     },
  //   );
  // };
  // useEffect(() => {
  //   if (imageFile) {
  //     uploadImage();
  //   }
  // }, [imageFile]);
  // const uploadImage = async () => {
  //   console.log("Uploading image...");

  //   try {
  //     const formData = new FormData();

  //     formData.append("image", imageFile);

  //     const xhr = new XMLHttpRequest();

  //     xhr.open("POST", "http://localhost:3000/api/user/upload");

  //     xhr.upload.onprogress = (event) => {
  //       if (event.lengthComputable) {
  //         const progress = Math.round((event.loaded / event.total) * 100);

  //         setImageFileUploadProgress(progress);
  //       }
  //     };

  //     xhr.onload = () => {
  //       const data = JSON.parse(xhr.responseText);

  //       if (xhr.status !== 200) {
  //         setImageFileUploadError(data.message);
  //         return;
  //       }

  //       setImageFileUrl(`http://localhost:3000${data.imageUrl}`);

  //       setImageFileUploadProgress(100);

  //       console.log(data);
  //     };

  //     xhr.onerror = () => {
  //       setImageFileUploadError("Image upload failed");
  //     };
  //     xhr.send(formData);
  //   } catch (error) {
  //     console.log(error);
  //     setImageFileUploadError(error.message);
  //   }

  const uploadImage = async () => {
    setImageFileUploadError(null);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("http://localhost:3000/api/user/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (!response.ok) {
        setImageFileUploadError(data.message);
        return;
      }

      setImageFileUrl(`http://localhost:3000${data.imageUrl}`);
      setImageFileUploadProgress(100);
    } catch (error) {
      console.error(error);
      setImageFileUploadError(error.message);
      setImageFileUploadProgress(0);
      setImageFile(null);
      setImageFileUrl(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`}
          />
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
        </div>

        {imageFileUploadError && (
          <Alert color="failure" className="text-center">
            {imageFileUploadError}
          </Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-purple-500"
          outline
        >
          Update
        </Button>
      </form>
      <div className=" text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
