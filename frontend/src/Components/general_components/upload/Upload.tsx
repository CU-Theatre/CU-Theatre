import React, { useId, useRef, useState } from "react";
import { upload } from "../../../utils/upload";
import classNames from "classnames";
import { ProgressIndicator } from "./ProgressIndicator/ProgressIndicator";
import { ButtonCross } from "../buttonCross";
import "./Upload.scss";

type Props = {
  onUpload: (data: unknown) => void;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  disabled?: boolean;
};

const URL = "";

export const Upload: React.FC<Props> = ({
  onUpload,
  className = "",
  children,
  overlay = true,
  disabled = false,
}) => {
  const id = useId();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const abortUploading = useRef<() => void>();

  const reset = () => {
    setLoading(false);
    setProgress(0);
  };

  const abort = () => {
    abortUploading.current?.();
    reset();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || loading) {
      return;
    }

    setLoading(true);

    // TODO add URL for sending files
    const uploading = upload(file, URL, { onProgress: setProgress });

    abortUploading.current = uploading.abort;

    uploading
      .then(() => onUpload('Img uploaded'))
      .catch((err) => {
        console.error("Upload failed:", err);
      })
      .finally(reset);
  };

  return (
    <div className={classNames("upload", className)}>
      {children}
      <label
        htmlFor={id}
        className={classNames("upload__label", "white-button", {
          "upload__label--hidden": loading,
        })}
      >
        <p className="upload__label-text">Select file</p>
        <input
          disabled={disabled}
          type="file"
          className={"upload__input"}
          onChange={handleUpload}
          id={id}
          accept="image/*"
        />
      </label>
      {loading && (
        <div className={"upload__loading"}>
          <ProgressIndicator progress={progress} />
          <ButtonCross onClick={abort} />
        </div>
      )}
      {/* TODO add preview img */}
      {previewUrl && (
        <div className="upload__preview">
          <img src={previewUrl} alt="Uploaded preview" className="upload__preview-image" />
        </div>
      )}
    </div>
  );
};
