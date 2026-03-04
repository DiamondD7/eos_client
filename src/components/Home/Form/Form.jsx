import React, { use, useEffect, useState } from "react";
import { LogDailyData, CheckUserIdentity } from "../../../assets/js/API";

import "../../../styles/formstyles.css";
import { CircleNotchIcon } from "@phosphor-icons/react";
const Form = ({ setSuccessfullySubmitted }) => {
  const [chosenColor, setChosenColor] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorUserNotFound, setErrorUserNotFound] = useState(false);
  const [errorAtMoodField, setErrorAtMoodField] = useState(false);
  const [errorAtSleepField, setErrorAtSleepField] = useState(false);
  const [errorAtEnergyField, setErrorAtEnergyField] = useState(false);
  const [errorAtOutputWorkField, setErrorAtOutputWorkField] = useState(false);

  const [ableToSubmit, setAbleToSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [outputWork, setOutputWork] = useState("");
  const [energy, setEnergy] = useState("");
  const [mood, setMood] = useState("");
  const [sleep, setSleep] = useState("");
  const [thoughts, setThoughts] = useState("");

  useEffect(() => {
    if (
      firstName &&
      email &&
      outputWork &&
      energy &&
      mood &&
      sleep &&
      thoughts &&
      !errorAtMoodField &&
      !errorAtSleepField
    ) {
      setAbleToSubmit(true);
    } else {
      setAbleToSubmit(false);
    }
  }, [
    firstName,
    email,
    mood,
    energy,
    outputWork,
    sleep,
    thoughts,
    errorAtMoodField,
    errorAtSleepField,
    errorAtEnergyField,
    errorAtOutputWorkField,
  ]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name === "mood") {
      if (value < 1 || value > 10) {
        // alert("Please enter a value between 1 and 10");
        setErrorAtMoodField(true);
        setMood("");
        return;
      }
      setErrorAtMoodField(false);
      setMood(value);
    } else if (name === "sleep") {
      if (value < 0 || value > 24) {
        // alert("Please enter a value between 0 and 24");
        setErrorAtSleepField(true);
        setSleep("");
        return;
      }
      setErrorAtSleepField(false);
      setSleep(value);
    } else if (name === "energy") {
      if (value < 1 || value > 10) {
        setErrorAtEnergyField(true);
        setEnergy("");
        return;
      }
      setErrorAtEnergyField(false);
      setEnergy(value);
    } else if (name === "outputWork") {
      if (value < 1 || value > 10) {
        setErrorAtOutputWorkField(true);
        setOutputWork("");
        return;
      }
      setErrorAtOutputWorkField(false);
      setOutputWork(value);
    }
  };

  const handleCheckIdentity = async () => {
    setIsloading(true);
    try {
      const response = await fetch(CheckUserIdentity, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Email: email,
        }),
      });

      if (response.status === 404) {
        setErrorUserNotFound(true);
        setIsloading(false);
        return;
      }

      if (!response.ok) {
        alert(
          "An error occurred while checking user identity. If you see this message, please let me know",
        );
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.status === true) {
        setErrorUserNotFound(false);
        await handleLogDailyData(data.userId);
      }
    } catch (err) {
      console.error("Error checking identity:", err);
      throw err;
    }
  };

  const handleLogDailyData = async (userId) => {
    try {
      const response = await fetch(LogDailyData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          UserId: userId,
          OutputWork: outputWork,
          EnergyLevel: energy,
          MoodLevel: mood,
          SleepHours: sleep,
          ColorDayNumber: chosenColor,
          JournalText: thoughts,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.status === true) {
        setIsloading(false);
        setSuccessfullySubmitted(true);
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMood("");
        setSleep("");
        setEnergy("");
        setOutputWork("");
        setThoughts("");

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Error logging daily data:", err);
      throw err;
    }
  };

  const handleColorClick = (e) => {
    const value = Number(e.target.value);
    if (value === chosenColor) {
      setChosenColor(0);
    } else {
      setChosenColor(value);
    }
  };

  return (
    <div>
      {errorUserNotFound && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          User is not found. Please check that your email was entered correctly.
        </p>
      )}
      <form
        className="form__wrapper"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleCheckIdentity();
        }}
      >
        <input
          className="form__input"
          type="text"
          value={firstName}
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="form__input"
          type="text"
          value={lastName}
          placeholder="Last name (optional)"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="form__input"
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        {errorAtEnergyField && (
          <label className="error-msg">
            Error: Please enter a value between 1 - 10
          </label>
        )}
        <input
          className="form__input"
          type="number"
          value={energy}
          name="energy"
          min={1}
          max={10}
          required
          onChange={handleOnChange}
          placeholder="Rate your energy level from 1-10 today"
        />

        {errorAtMoodField && (
          <label className="error-msg">
            Error: Please enter a value between 1 - 10
          </label>
        )}
        <input
          className="form__input"
          type="number"
          value={mood}
          name="mood"
          min={1}
          max={10}
          required
          onChange={handleOnChange}
          placeholder="Rate your mood from 1-10 today"
        />

        {errorAtOutputWorkField && (
          <label className="error-msg">
            Error: Please enter a value between 1 - 10
          </label>
        )}
        <input
          className="form__input"
          type="number"
          value={outputWork}
          name="outputWork"
          min={1}
          max={10}
          required
          onChange={handleOnChange}
          placeholder="How productive were you today on a scale of 1-10?"
        />

        {errorAtSleepField && (
          <label className="error-msg">
            Error: Please enter a value between 0 - 24
          </label>
        )}
        <input
          className="form__input"
          type="number"
          value={sleep}
          name="sleep"
          min={0}
          max={24}
          required
          onChange={handleOnChange}
          placeholder="How many hours of sleep did you get last night?"
        />

        <br />
        <br />
        <textarea
          className="form-sentence__textarea"
          placeholder="Write 2–5 sentences about your day"
          value={thoughts}
          required
          onChange={(e) => setThoughts(e.target.value)}
        ></textarea>

        <br />
        <p className="pick-a-color-statement__p">
          Optional: Pick a color that feels like today, a color helps us spot
          patterns over time.
        </p>
        <div className="day-color-btns__wrapper">
          <p style={{ fontSize: "10px" }}>← Not great</p>
          <button
            type="button"
            className={`one__btn ${chosenColor === 1 ? "chosenColor" : ""}`}
            value={1}
            onClick={(e) => handleColorClick(e)}
          ></button>
          <button
            type="button"
            className={`two__btn ${chosenColor === 2 ? "chosenColor" : ""}`}
            value={2}
            onClick={(e) => handleColorClick(e)}
          ></button>
          <button
            type="button"
            className={`three__btn ${chosenColor === 3 ? "chosenColor" : ""}`}
            value={3}
            onClick={(e) => handleColorClick(e)}
          ></button>
          <button
            type="button"
            className={`four__btn ${chosenColor === 4 ? "chosenColor" : ""}`}
            value={4}
            onClick={(e) => handleColorClick(e)}
          ></button>
          <button
            type="button"
            className={`five__btn ${chosenColor === 5 ? "chosenColor" : ""}`}
            value={5}
            onClick={(e) => handleColorClick(e)}
          ></button>
          <p style={{ fontSize: "10px" }}>Great →</p>
        </div>

        <button
          type="submit"
          disabled={!ableToSubmit}
          className={`form-submit__btn ${ableToSubmit ? "" : "disabledBtnForm"}`}
        >
          {isLoading === true ? (
            <CircleNotchIcon
              color="#fff"
              size={15}
              className={"-btn-loading__icon"}
            />
          ) : (
            "Submit"
          )}
        </button>

        {success && (
          <p className="success-submit-msg__p">Successfully submitted</p>
        )}
      </form>
    </div>
  );
};

export default Form;
