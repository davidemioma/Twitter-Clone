import React, { useState } from "react";
import Modal from "./Modal";
import Input from "../Input";
import useLoginModal from "@/hooks/useLoginModal";

const Login = () => {
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
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

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={() => loginModal.onClose()}
      title="Login"
      actionLabel="Sign In"
      onSubmit={onSubmit}
      body={bodyContent}
      disabled={loading}
    />
  );
};

export default Login;
