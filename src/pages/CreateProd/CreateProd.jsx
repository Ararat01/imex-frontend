import React, { useEffect, useRef, useState } from "react";
import "./CreateProd.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { Switcher } from "../../ui/inputs/Switcher/Switcher";
import { Select } from "../../ui/inputs/Select/Select";
import Header from "../../components/Header/Header";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import UploadImages from "../../ui/inputs/UploadImage/UploadImage";
import API_URL from "../../config";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const CreateProd = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("token");
  const { t } = useTranslation();

  // const [switcherValue, setSwitcherValue] = useState("ԱՁ");
  // const changeSwitcher = (val) => {
  //   setSwitcherValue(val);
  // };
  // const [selectValue, setSelectValue] = useState("Արտահանում");
  // const getSelectValue = (val) => {
  //   setSelectValue(val);
  // };

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const uploadImageRef = useRef(null);

  const handleImgSubmit = () => {
    if (uploadImageRef.current) {
      return uploadImageRef.current.handleUpload();
    }
  };

  const {
    register,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      info: "",
      price: "",
      make: "",
      model: "",
      vin: "",
      year: "",
      mileage: "",
      color: "",
    },
    mode: "onChange",
  });

  const [selectorValues, setSelValues] = useState({
    market: "",
    driveTrain: "",
    handDrive: "",
    bodyStyle: "",
    gearBox: "",
    currency: "",
    km: "",
    engine: "",
  });
  const setSelector = (key, val) => {
    selectorValues[key] = val;
    console.log(selectorValues);
  };

  const handleRegister = async () => {
    console.log(getValues());

    const isFormValid = await trigger();
    if (isFormValid) {
      const images = await handleImgSubmit();

      const formValues = getValues();
      const values = {
        ...formValues,
        ...selectorValues,
        images,
      };

      axios
        .post(`${API_URL}/product/createCar`, values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Header />
      <div className="container prodForm">
        <form action="">
          <input
            className="mb10"
            placeholder={t("make")}
            type="text"
            autoComplete="off"
            name="name"
            {...register("make")}
          />
          <input
            className="mb10"
            placeholder={t("model")}
            type="text"
            autoComplete="off"
            name="model"
            {...register("model")}
          />
          <input
            className="mb10"
            placeholder={t("year")}
            type="text"
            autoComplete="off"
            name="year"
            {...register("year")}
          />
          <div className="price mb10">
            <input
              placeholder={t("price")}
              type="number"
              autoComplete="off"
              name="price"
              {...register("price")}
            />
            <Select
              getValue={(val) => setSelector("currency", val)}
              defo="Dollar $"
              options={["Dollar $", "Рубли ₽", "Դրամ ֏"]}
            />
          </div>
          <div className="price mb10">
            <input
              placeholder={t("mileage")}
              type="number"
              autoComplete="off"
              name="mileage"
              {...register("mileage")}
            />
            <Select
              getValue={(val) => setSelector("km", val)}
              defo={t("km")}
              options={["km", "mil"]}
            />
          </div>
          <input
            className="mb10"
            placeholder={t("vin")}
            type="text"
            autoComplete="off"
            name="vin"
            {...register("vin")}
          />
          <input
            className="mb10"
            placeholder={t("color")}
            type="text"
            autoComplete="off"
            name="color"
            {...register("color")}
          />

          <input
            className="mb10"
            placeholder={t("location")}
            type="text"
            autoComplete="off"
            name="location"
            {...register("location")}
          />
          <div className="selectors">
            <div className="selectors_line mb10">
              <p className="tooltip">
                {t("market")}
                <span class="tooltip-text">
                  {t("prMarketExp")}
                  <hr />
                  {t("scMarketExp")}
                </span>
                <svg
                  className="quest"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{" "}
                    <circle cx="12" cy="16" r="1" fill="#000000"></circle>{" "}
                    <path
                      d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{" "}
                  </g>
                </svg>
              </p>

              <Select
                getValue={(val) => setSelector("market", val)}
                defo={`${t("select")} ${t("market")}`}
                options={["primaryMarket", "secondaryMarket"]}
              />
            </div>
            <div className="selectors_line mb10">
              <p>{t("bodyStyle")}</p>
              <Select
                getValue={(val) => setSelector("bodyStyle", val)}
                defo={`${t("select")} ${t("bodyStyle")}`}
                options={[
                  "sedan",
                  "hatchback",
                  "wagon",
                  "coupe",
                  "convertible",
                  "suv",
                  "pickup",
                  "minivan",
                  "van",
                  "limousine",
                ]}
              />
            </div>
            <div className="selectors_line mb10">
              <p>{t("handDrive")}</p>
              <Select
                getValue={(val) => setSelector("handDrive", val)}
                defo={`${t("select")} ${t("handDrive")}`}
                options={["left", "right", "rightToLeft"]}
              />
            </div>
            <div className="selectors_line mb10">
              <p>{t("gearBox")}</p>
              <Select
                getValue={(val) => setSelector("gearBox", val)}
                defo={`${t("select")} ${t("gearBox")}`}
                options={[
                  "manual",
                  "automatic",
                  "semiAuto",
                  "variable",
                  "other",
                ]}
              />
            </div>
            <div className="selectors_line mb10">
              <p>{t("engine")}</p>
              <Select
                getValue={(val) => setSelector("engine", val)}
                defo={`${t("select")} ${t("engine")}`}
                options={[
                  "gasoline",
                  "gas",
                  "diesel",
                  "hybrid",
                  "electric",
                  "hydrogen",
                  "noEngine",
                  "gasolineAndGas",
                ]}
              />
            </div>
            <div className="selectors_line mb10">
              <p>{t("driveTrain")}</p>
              <Select
                getValue={(val) => setSelector("driveTrain", val)}
                defo={`${t("select")} ${t("driveTrain")}`}
                options={["fwd", "rwd", "awd"]}
              />
            </div>
          </div>
          <label className="mb10" htmlFor="info">
            {t("addInfo")}
          </label>
          <textarea
            className="mb10"
            rows="5"
            name="info"
            id="info"
            {...register("info")}
          ></textarea>
          <span className="mb10">{t("uploadImg")}</span>
          <UploadImages multiple={true} ref={uploadImageRef} />
          <br className="mb10" />
          <Button text={t("add")} click={handleRegister} />
        </form>
      </div>
    </>
  );
};
