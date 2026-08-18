import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
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
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  console.log(currentUser?.profilePicture);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(imageFileUploadProgress, imageFileUploadError);
  const filePickerRef = useRef(null);
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  console.log(imageFile, imageFileUrl);
  // useEffect(() => {
  //   if (imageFile) {
  //     uploadImage();
  //   }
  // }, [imageFile]);

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
    setImageFileUploading(true);
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
      setFormData({
        ...formData,
        profilePicture: `http://localhost:3000${data.imageUrl}`,
      });
      setImageFileUploadProgress(100);
    } catch (error) {
      console.error(error);
      setImageFileUploadError(error.message);
      setImageFileUploadProgress(0);
      setImageFile(null);
      setImageFileUrl(null);
    } finally {
      setImageFileUploading(false);
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      // No changes to submit
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for the image to finish uploading");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:3000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/signout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-purple-500"
          outline
        >
          Update
        </Button>
      </form>
      <div className=" text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModel(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="text-center mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="text-center mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="text-center mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDeleteUser}>
                Yes, I am sure..
              </Button>
              <Button color="gray" onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
