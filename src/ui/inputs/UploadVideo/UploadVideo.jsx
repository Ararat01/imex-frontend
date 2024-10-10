import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
} from "react";
import axios from "axios";
import "./UploadVideo.scss"; // Custom styles
import API_URL from "../../../config";
import { useTranslation } from "react-i18next";

const UploadVideo = forwardRef((props, ref, url = "/uploads") => {
  const fileInputRef = useRef(null);
  const [loadedVideoName, setVideoName] = useState(""); // State specific to video component
  const { t } = useTranslation();

  const [files, setFiles] = useState([]);

  useImperativeHandle(ref, () => ({
    handleUpload: async () => {
      if (files.length === 0) return;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("videos", files[i]);
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

        const { videoUrls } = response.data;

        return videoUrls;
      } catch (error) {
        console.error("Error uploading videos:", error);
        alert("Failed to upload videos");
      }
    },
  }));

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    setVideoName(e.target.files[0].name); // Set the video name
  };

  return (
    <div className="file-upload-container">
      <input
        ref={fileInputRef}
        type="file"
        id="fileInputVideo"
        className="file-input"
        multiple={props.multiple}
        accept="video/*"
        onChange={handleFileChange}
      />
      <label htmlFor="fileInputVideo" className="file-upload-button">
        {t(props.label || "chooseFile")}
      </label>
      <span id="fileName" className="file-name">
        {loadedVideoName || t("noFiles")}
      </span>
    </div>
  );
});

export default UploadVideo;
