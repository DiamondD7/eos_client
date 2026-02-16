import React, { useState } from "react";

import "../../../styles/formstyles.css";
const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mood, setMood] = useState("");
  const [sleep, setSleep] = useState("");
  const [thoughts, setThoughts] = useState("");

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name === "mood") {
      if (value < 1 || value > 10) {
        alert("Please enter a value between 1 and 10");
        setMood("");
        return;
      }
      setMood(value);
    } else if (name === "sleep") {
      if (value < 0 || value > 24) {
        alert("Please enter a value between 0 and 24");
        setSleep("");
        return;
      }
      setSleep(value);
    }
  };

  return (
    <div>
      <form className="form__wrapper">
        <input
          className="form__input"
          type="text"
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          className="form__input"
          type="number"
          value={mood}
          name="mood"
          min={1}
          max={10}
          onChange={handleOnChange}
          placeholder="Rate your mood from 1-10 today"
        />
        <input
          className="form__input"
          type="number"
          value={sleep}
          name="sleep"
          min={0}
          max={24}
          onChange={handleOnChange}
          placeholder="How many hours of sleep did you get last night?"
        />
        <br />
        <br />
        <textarea
          className="form-sentence__textarea"
          placeholder="Write 2–5 sentences about your day"
          onChange={(e) => setThoughts(e.target.value)}
        ></textarea>

        <button className="form-submit__btn">Submit</button>
      </form>
    </div>
  );
};

export default Form;
