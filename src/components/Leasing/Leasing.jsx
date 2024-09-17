import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import "./Leasing.scss";
import { Select } from "../../ui/inputs/Select/Select";

export const Leasing = () => {
  const { t } = useTranslation();
  const [maxLeasing, setMaxLeasing] = useState("");

  const getMaxLeasing = (values) => {
    const loans = values.loans ? values.loans : 0;
    const profit = values.income - values.consumption;
    const acc = profit / 1.4 - loans;
    const percent = (acc / 100) * 2.54;
    const ml = parseInt((acc * acc) / percent);
    setMaxLeasing(ml);
  };

  const setSelector = (sel, val) => {
    setFactors({
      ...factors,
      [sel]: val,
    });
  };

  const [factors, setFactors] = useState({
    loanStory: true,
    time: true,
    imprest: true,
  });
  const {
    register,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      income: "",
      consumption: "",
      loans: "",
    },
    mode: "onChange",
  });

  return (
    <div className="leasing">
      <h3>ID bank</h3>
      <form action="">
        <div className="selectors">
          <div className="selectors_line mb10">
            <p>
              {t("loanStory")} {t("last_loan_story")}
            </p>
            <Select
              error={!factors.loanStory}
              getValue={(val) =>
                setSelector("loanStory", val !== "moreten" ? true : false)
              }
              defo={`${t("lessten")}`}
              options={["lessten", "moreten"]}
            />
          </div>
          <div className="selectors_line mb10">
            <p>{t("leasingTime")}</p>
            <Select
              error={!factors.time}
              getValue={(val) =>
                setSelector("time", val !== "more60month" ? true : false)
              }
              defo={`${t("12month")}`}
              options={[
                "12month",
                "24month",
                "36month",
                "48month",
                "60month",
                "more60month",
              ]}
            />
          </div>
          <div className="selectors_line mb10">
            <p>{t("imprest")}</p>
            <Select
              error={!factors.imprest}
              getValue={(val) =>
                setSelector("imprest", val !== "0-19%" ? true : false)
              }
              defo={`${t("20-30%")}`}
              options={["0-19%", "20-30%", "31-40%", "41-50%", "more50%"]}
            />
          </div>
        </div>
        <div className="inputs">
          <div className="inputs_line">
            <div className="inputs_line_flex">
              <label htmlFor="income">{t("incomeLabel")}</label>
              <input
                className="mb10"
                id="income"
                placeholder={t("income")}
                type="number"
                autoComplete="off"
                name="income"
                {...register("income", {
                  required: "requiredField",
                  validate: (value) =>
                    parseFloat(value) > getValues().consumption ||
                    "morethanconsumtion",
                })}
              />
            </div>
            {errors.income && <p>{t(errors.income.message)}</p>}
          </div>
          <div className="inputs_line">
            <div className="inputs_line_flex">
              <label htmlFor="consumption">{t("consumptionLabel")}</label>
              <input
                className="mb10"
                id="consumption"
                placeholder={t("consumption")}
                type="number"
                autoComplete="off"
                name="consumption"
                {...register("consumption", {
                  required: "requiredField",
                  validate: (value) => parseFloat(value) > 0 || "morethanzero",
                })}
              />
            </div>
            {errors.consumption && <p>{t(errors.consumption.message)}</p>}
          </div>
          <div className="inputs_line">
            <div className="inputs_line_flex">
              <label htmlFor="loans">{t("loanLabel")}</label>
              <input
                className="mb10"
                id="loans"
                placeholder={t("loans")}
                type="number"
                autoComplete="off"
                name="loans"
                {...register("loans")}
              />
            </div>
          </div>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "50px",
        }}
      >
        <button
          className="btn"
          disabled={
            !(factors.time && factors.imprest && factors.loanStory) ||
            errors.income ||
            errors.consumption ||
            !isDirty
          }
          onClick={() => {
            getMaxLeasing(getValues());
          }}
        >
          {t("count")}
        </button>
        <h4>{maxLeasing} AMD</h4>
      </div>
    </div>
  );
};
