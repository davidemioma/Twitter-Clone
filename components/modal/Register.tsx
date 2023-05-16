import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import Input from "../Input";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

const Register = () => {
  const loginModal = useLoginModal();

  const registerModal = useRegisterModal();

  const [name, setName] = useState("");

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (loading) return;

    registerModal.onClose();

    loginModal.onOpen();
  }, [loading, registerModal, loginModal]);

  const onSubmit = () => {
    setLoading(true);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />

      <Input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />

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
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={() => registerModal.onClose()}
      title="Create an account"
      actionLabel="Register"
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
      disabled={loading}
    />
  );
};

export default Register;
