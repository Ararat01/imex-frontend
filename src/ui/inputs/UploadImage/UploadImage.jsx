import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
} from "react";
import axios from "axios";
import "./UploadImage.scss"; // Custom styles
import API_URL from "../../../config";
import { useTranslation } from "react-i18next";

const UploadImage = forwardRef((props, ref) => {
  const fileInputRef = useRef(null);
  const [loadedImageName, setImageName] = useState(""); // State specific to image component
  const { t } = useTranslation();

  const [files, setFiles] = useState([]);

  useImperativeHandle(ref, () => ({
    handleUpload: async () => {
      if (files.length === 0) return;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      try {
        const response = await axios.post(
          API_URL + (props.url || "/uploads"),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { imageUrls } = response.data;

        return imageUrls;
      } catch (error) {
        console.error("Error uploading images:", error);
        alert("Failed to upload images");
      }
    },
  }));

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    setImageName(e.target.files[0].name); // Set the image name
  };

  return (
    <div className="file-upload-container">
      <input
        ref={fileInputRef}
        type="file"
        id="fileInputImage"
        className="file-input"
        multiple={props.multiple}
        accept="image/*"
        onChange={handleFileChange}
      />
      <label htmlFor="fileInputImage" className="file-upload-button">
        {t(props.label || "chooseFile")}
      </label>
      <span id="fileName" className="file-name">
        {loadedImageName || t("noFiles")}
      </span>
    </div>
  );
});

export default UploadImage;
