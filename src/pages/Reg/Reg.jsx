import React, { useRef, useState } from "react";
import "./Reg.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { Switcher } from "../../ui/inputs/Switcher/Switcher";
import { Select } from "../../ui/inputs/Select/Select";
import Header from "../../components/Header/Header";
import { useForm } from "react-hook-form";
import UploadImages from "../../ui/inputs/UploadImage/UploadImage";
import API_URL from "../../config";
import axios from "axios";

export const Reg = () => {
  const navigate = useNavigate();

  const [switcherValue, setSwitcherValue] = useState("ԱՁ");
  const changeSwitcher = (val) => {
    setSwitcherValue(val);
  };
  const [selectValue, setSelectValue] = useState("Արտահանում");
  const getSelectValue = (val) => {
    setSelectValue(val);
  };

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
      email: "",
      name: "",
      password: "",
      about: "",
      phone: "",
    },
    mode: "onChange",
  });

  const handleRegister = async () => {
    const isFormValid = await trigger();
    if (isFormValid) {
      const logoUrl = await handleImgSubmit();

      const formValues = getValues();
      const values = {
        ...formValues,
        logo: logoUrl[0],
        type: switcherValue,
        kind: selectValue,
      };

      axios
        .post(`${API_URL}/auth/register`, values)
        .then((res) => {
          navigate("/log");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Header />
      <div className="container regForm">
        <form action="">
          <div className="flex mb10">
            <Switcher
              rightText="ԱՁ"
              leftText="ՍՊԸ"
              selected={switcherValue}
              changeSelect={changeSwitcher}
            />
            <Select
              text="Տիպ:"
              getValue={getSelectValue}
              defo={selectValue}
              options={[
                "Արտահանում",
                "Ներմուծում",
                "Բանկ",
                "Ապահովագրական ընկերություններ",
                "Լոգիստիկ կազմակերպություն",
              ]}
            />
          </div>
          <input
            className="mb10"
            placeholder="Անվանում*"
            type="text"
            autoComplete="off"
            name="name"
            {...register("name")}
          />
          <input
            className="mb10"
            placeholder="+374 99 01-02-03"
            type="tel"
            autoComplete="off"
            name="phone"
            {...register("phone")}
          />
          <input
            className="mb10"
            placeholder="Էլ․ հասցե*"
            type="email"
            autoComplete="off"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mb10" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
          {["Արտահանում", "Ներմուծում"].includes(selectValue) ? (
            <>
              <label className="mb10" htmlFor="about">
                Ներկայացրեք թե ինչով եք զբաղվում
              </label>
              <textarea
                className="mb10"
                rows="5"
                name="about"
                id="about"
                {...register("about")}
              ></textarea>
            </>
          ) : (
            <></>
          )}
          <span className="mb10">Բեռնեք Ձեր լոգոն</span>
          <UploadImages multiple={false} ref={uploadImageRef} />
          <br className="mb10" />
          <input
            className="mb10"
            placeholder="Գաղտնաբառ"
            autoComplete="off"
            type="password"
            {...register("password", {
              required: true,
              minLength: 4,
            })}
            name="password"
          />
          <Button text="Գրանցվել" click={handleRegister} />
        </form>
        <p>Արդեն գրանցված ե՞ք</p>
        <Link>Մուտք</Link>
      </div>
    </>
  );
};
