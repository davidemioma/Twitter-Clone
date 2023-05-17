import React, { useCallback, useState } from "react";
import axios from "axios";
import Button from "./Button";
import Avatar from "./Avatar";
import usePosts from "@/hooks/usePosts";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import ImageUpload from "./input/ImageUpload";

interface Props {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form = ({ placeholder, isComment, postId }: Props) => {
  const loginModal = useLoginModal();

  const registerModal = useRegisterModal();

  const { data: currentuser } = useCurrentUser();

  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(() => {
    setLoading(true);

    axios
      .post("/api/posts", { body, image })
      .then(() => {
        toast.success("Tweet created");

        setBody("");

        setImage("");

        mutatePosts();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [body, mutatePosts]);

  return (
    <div className="px-5 py-2 border-b border-neutral-800">
      {currentuser ? (
        <div className="flex items-start gap-4">
          <Avatar userId={currentuser?.id} />

          <div className="flex-1 flex flex-col">
            <textarea
              className="bg-black w-full peer ring-0 resize-none outline-none placeholder-neutral-500 disabled:opacity-80"
              placeholder={placeholder}
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={loading}
            />

            <hr className="w-full h-[1px] mb-4 border-neutral-800 opacity-0 peer-focus:opacity-100" />

            <div className="flex items-center justify-between">
              <ImageUpload
                forPost
                value={image}
                onChange={(image) => setImage(image)}
                disabled={loading}
              />

              <Button
                label="Tweet"
                onClick={onSubmit}
                disabled={!body.trim() || loading}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h2 className="text-center font-bold text-xl md:text-2xl mb-3">
            Welcome to Twitter
          </h2>

          <div className="flex items-center justify-center gap-3">
            <Button label="Login" onClick={() => loginModal.onOpen()} />

            <Button
              label="Register"
              onClick={() => registerModal.onOpen()}
              secondary
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
