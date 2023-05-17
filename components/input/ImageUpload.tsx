import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

interface Props {
  value?: string;
  label?: string;
  disabled?: boolean;
  onChange: (base64: string) => void;
}

const ImageUpload = ({ value, label, disabled, onChange }: Props) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];

      const reader = new FileReader();

      reader.onload = (e: any) => {
        setBase64(e.target.result);

        handleChange(e.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
      "image/webp": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="w-full p-4 text-center rounded-md cursor-pointer border-2 border-dotted border-neutral-700"
    >
      <input {...getInputProps()} />

      {base64 ? (
        <div className="flex items-center justify-center">
          <Image width={100} height={100} src={base64} alt="upload" />
        </div>
      ) : (
        <p>{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
