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

export const CreateProd = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("token");

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
    control,
  } = useForm({
    defaultValues: {
      name: "",
      info: "",
      price: "",
      category: "",
      subcategory: "",
      list: [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });

  const handleRegister = async () => {
    console.log(getValues());

    const isFormValid = await trigger();
    if (isFormValid) {
      const images = await handleImgSubmit();

      const formValues = getValues();
      const values = {
        ...formValues,
        images: images,
        userId: user._id,
        type: user.type,
        contact: user.phone,

        // type: switcherValue,
        // kind: selectValue,
      };

      axios
        .post(`${API_URL}/product/create`, values)
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
            placeholder="Անվանում*"
            type="text"
            autoComplete="off"
            name="name"
            {...register("name")}
          />
          <input
            className="mb10"
            placeholder="Գին"
            type="text"
            autoComplete="off"
            name="price"
            {...register("price")}
          />
          <input
            className="mb10"
            placeholder="Կատեգորիա"
            type="text"
            autoComplete="off"
            name="category"
            {...register("category")}
          />
          <input
            className="mb10"
            placeholder="Ենթակատեգորիա"
            type="text"
            autoComplete="off"
            name="subcategory"
            {...register("subcategory")}
          />
          {getValues("list").map((item, index) => (
            <div key={index} className="mb10 field">
              <div className="controller">
                {" "}
                <Controller
                  name={`list[${index}].key`}
                  control={control}
                  render={({ field }) => (
                    <input {...field} placeholder="" autoComplete="off" />
                  )}
                />
              </div>
              <div className="controller">
                <Controller
                  name={`list[${index}].value`}
                  control={control}
                  render={({ field }) => (
                    <input {...field} placeholder="" autoComplete="off" />
                  )}
                />
              </div>

              <button
                type="button"
                className="delete"
                onClick={() => remove(index)}
              >
                {" "}
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#f84646"
                      d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn mb10"
            onClick={() => append({ key: "", value: "" })}
          >
            Ավելացնել դաշտ
          </button>
          <label className="mb10" htmlFor="info">
            Արտադրանքի մեկնաբանում
          </label>
          <textarea
            className="mb10"
            rows="5"
            name="info"
            id="info"
            {...register("info")}
          ></textarea>
          <span className="mb10">Բեռնեք արտադրանքի նկարները</span>
          <UploadImages multiple={true} ref={uploadImageRef} />
          <br className="mb10" />
          <Button text="Ավելացնել" click={handleRegister} />
        </form>
      </div>
    </>
  );
};
