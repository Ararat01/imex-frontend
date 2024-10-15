import React, { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import UploadImages from "../../ui/inputs/UploadImage/UploadImage";
import { Link, useNavigate, useParams } from "react-router-dom";
import API_URL from "../../config";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button/Button";
import "./TradeIn.scss";

import Header from "../../components/Header/Header";
import UploadVideo from "../../ui/inputs/UploadVideo/UploadVideo.jsx";
import UploadImage from "../../ui/inputs/UploadImage/UploadImage.jsx";

export const TradeIn = () => {
  const navigate = useNavigate();
  const { ln } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const uploadImageRef = useRef(null);
  const handleImgSubmit = () => {
    if (uploadImageRef.current) {
      return uploadImageRef.current.handleUpload();
    }
  };
  //

  return (
    <>
      <Header />
      <div className="container tradein">
        <h2>{t("whatistradein")}</h2>
        <p className="tradein_p">{t("tradeinabout1")}</p>
        <div className="ul">
          <h4 className="li">
            <b>{t("appraisal")}</b>
            {t("appraisal-text")}
          </h4>
          <h4 className="li">
            <b>{t("offer")}</b>
            {t("offer-text")}
          </h4>
          <h4 className="li">
            <b>{t("payment")}</b>
            {t("payment-text")}
          </h4>
        </div>
        <p className="tradein_p">{t("tradeinabout2")}</p>
        <h2 className="title">{t("companies")}</h2>

        <div className="companies">
          <div className="companies_block">
            <img
              className="companies_block_img"
              src="/images/tradein.jpg"
              alt=""
            />
            <div className="companies_block_info">
              <h3>CarMax</h3>
              <p className="description">
                CarMax is one of the largest used car retailers in the United
                States, offering a straightforward trade-in process. You can
                sell your old car directly to CarMax, even if you don’t buy a
                new one from them. If you're interested in trading in, you can
                use the value of your old car as a down payment on a new or used
                vehicle from their inventory. They offer a 7-day price guarantee
                on trade-ins, giving you time to compare with other offers.
              </p>
            </div>
          </div>
          <div className="companies_block reverse">
            <img
              className="companies_block_img"
              src="/images/tradein.jpg"
              alt=""
            />
            <div className="companies_block_info">
              <h3>CarMax</h3>
              <p className="description">
                CarMax is one of the largest used car retailers in the United
                States, offering a straightforward trade-in process. You can
                sell your old car directly to CarMax, even if you don’t buy a
                new one from them. If you're interested in trading in, you can
                use the value of your old car as a down payment on a new or used
                vehicle from their inventory. They offer a 7-day price guarantee
                on trade-ins, giving you time to compare with other offers.
              </p>
            </div>
          </div>
          <div className="companies_block">
            <img
              className="companies_block_img"
              src="/images/tradein.jpg"
              alt=""
            />
            <div className="companies_block_info">
              <h3>CarMax</h3>
              <p className="description">
                CarMax is one of the largest used car retailers in the United
                States, offering a straightforward trade-in process. You can
                sell your old car directly to CarMax, even if you don’t buy a
                new one from them. If you're interested in trading in, you can
                use the value of your old car as a down payment on a new or used
                vehicle from their inventory. They offer a 7-day price guarantee
                on trade-ins, giving you time to compare with other offers.
              </p>
            </div>
          </div>
        </div>
        <div className="tradeinupload">
          <h2>{t("example")}</h2>
          <div className="image-examples">
            <img src="/images/inner.jpg" alt="" />
            <img src="/images/front.png" alt="" />
            <img src="/images/back.png" alt="" />
            <img src="/images/lside.png" alt="" />
            <img src="/images/rside.png" alt="" />
            <img src="/images/aside.png" alt="" />
          </div>
          <p>{t("needtradein")}</p>
          <textarea></textarea>
          <UploadImage
            multiple={true}
            url={"/tradeInPhotos"}
            label={"choosePhotos"}
          />
          <br />
          <UploadVideo
            multiple={true}
            url={"/tradeInVideos"}
            label={"chooseVideos"}
          />
        </div>
      </div>
    </>
  );
};
