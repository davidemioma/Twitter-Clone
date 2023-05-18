import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import Input from "../input/Input";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

const Login = () => {
  const loginModal = useLoginModal();

  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (loading) return;

    loginModal.onClose();

    registerModal.onOpen();
  }, [loading, loginModal, registerModal]);

  const onSubmit = () => {
    setLoading(true);

    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((callback) => {
      setLoading(false);

      if (callback?.ok) {
        toast.success("Login successful");

        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <Input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-neutral-400 text-center">
      <p>
        First time using twitter?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={() => loginModal.onClose()}
      title="Login"
      actionLabel="Sign In"
      onSubmit={onSubmit}
      body={bodyContent}
      disabled={loading}
      footer={footerContent}
    />
  );
};

export default Login;
