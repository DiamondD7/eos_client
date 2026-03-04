import React, { useState } from "react";
import Form from "./Form/Form";

import "../../styles/homestyles.css";
import SuccessValidation from "./Form/SuccessValidation";
const Home = () => {
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

  return (
    <div>
      <h1 className="welcome__h1"> Hey, thanks for doing this.</h1>
      <br />
      <div className="welcome-statement-form__wrapper">
        <p className="welcome-statement__p">
          This is a small experiment I’m running. <br /> <br /> The idea is
          simple: if we track a few signals daily, we can figure out what
          “normal” looks like for you. <br />
          <br /> After a month, we can start spotting when something shifts.{" "}
          <strong>
            Like energy dropping, sleep changing, stress creeping up, or
            recovery slowing down
          </strong>
          . Over time, patterns like these could even help flag early signs of
          burnout, overtraining, or potential injury risk before they become
          obvious.
          <br />
          <br /> It’s not medical. It’s just pattern awareness. <br />
          <br />
          It should take less than a minute a day. <br />
          <br /> Your responses are private and won’t be shared. This is just
          for this experiment. If you ever want your data removed, I’ll delete
          it. <br />
          <br /> <strong>Consistency is the only thing that matters</strong>.
          Let’s see what we discover.
          <br />
          <br /> - Aaron
        </p>

        {successfullySubmitted === false ? (
          <Form setSuccessfullySubmitted={setSuccessfullySubmitted} />
        ) : (
          <SuccessValidation />
        )}
      </div>
    </div>
  );
};

export default Home;
