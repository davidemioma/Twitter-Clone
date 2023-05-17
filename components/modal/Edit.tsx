import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import Input from "../input/Input";
import ImageUpload from "../input/ImageUpload";

const Edit = () => {
  const editModal = useEditModal();

  const { data: currentUser } = useCurrentUser();

  const { data: user, mutate } = useUser(currentUser?.id);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [username, setUsername] = useState("");

  const [bio, setBio] = useState("");

  const [profileImage, setProfileImage] = useState("");

  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ]);

  const onSubmit = useCallback(() => {
    setLoading(true);

    axios
      .patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      })
      .then(() => {
        toast.success("Profile Updated");

        mutate();

        editModal.onClose();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name, username, bio, profileImage, coverImage, editModal, mutate]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        value={name}
        type="text"
        placeholder="Name"
        disabled={loading}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        value={username}
        type="text"
        placeholder="Username"
        disabled={loading}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        value={bio}
        type="text"
        placeholder="Bio"
        disabled={loading}
        onChange={(e) => setBio(e.target.value)}
      />

      <ImageUpload
        label="Upload profile image"
        value={profileImage}
        disabled={loading}
        onChange={(image) => setProfileImage(image)}
      />

      <ImageUpload
        label="Upload cover image"
        value={coverImage}
        disabled={loading}
        onChange={(image) => setCoverImage(image)}
      />
    </div>
  );

  return (
    <Modal
      title="Edit profile"
      isOpen={editModal.isOpen}
      onClose={() => editModal.onClose()}
      onSubmit={onSubmit}
      actionLabel="Save"
      disabled={loading}
      body={bodyContent}
    />
  );
};

export default Edit;
