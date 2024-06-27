import React from "react";
import { useNavigate } from "react-router-dom";

const Agreement: React.FC = () => {
  const navigate = useNavigate();
  const boxStyles = "border-2 p-4 mb-6 rounded-lg shadow-md bg-white";
  const boxTitles = "text-xl font-extrabold mb-4 text-center";

  return (
    <div className="flex justify-center items-center">
      <div className="text-left max-w-3xl mx-auto p-4">
        <div className={"border-2 p-4 mb-6 rounded-lg shadow-md bg-blue-100"}>
          <div className={boxStyles}>
            <h1 className={boxTitles}>Opening statement</h1>

            <p className="mb-2">
              You are being invited to participate in a research study titled
              "ShapeCAPTCHA". This study is being done by Akif Ozturk, a Masters
              student from the TU Delft. This research is self-funded and does
              not involve any third-party funding bodies.
            </p>
            <p className="mb-2">
              The purpose of this research study is to create a CAPTCHA that is
              user-friendly and can differentiate users from bots accurately. It
              will take you approximately 15 seconds to complete, and can be
              repeated as many times as you want.
            </p>
            <p className="mb-2">
              The data will be used to collect human mouse patterns in order to
              train our machine learning model so it can accurately
              differentiate between human and bot users.
            </p>
            <p className="mb-2">
              We will be asking you to pick a shape and follow it using your
              mouse pointer. There will be distracting shapes which are
              variations of the chosen shape. There will only be ONE shape that
              exactly matches with your chosen one. Your task is to follow that
              one.
            </p>
          </div>
          <div className={boxStyles}>
            <h2 className={boxTitles}>Data Privacy</h2>

            <p className="mb-2">
              The only personal data we will collect is your mouse movement
              data. No other personally identifiable information will be
              collected. The mouse movement data will be used solely for the
              purpose of this research and will not be shared with any third
              parties.
            </p>

            <p className="mb-2">
              As with any online activity the risk of a breach is always
              possible. All data will be anonymised and stored securely to
              maintain confidentiality. Access to the data will be strictly
              controlled and it will not be used for any other purposes.
            </p>
          </div>

          <div className={boxStyles}>
            <h2 className={boxTitles}>Risk and Participation</h2>

            <p className="mb-2">
              There are no known physical or emotional risks associated with
              this study. In terms of reputational risks the risk is minimal,
              since we are not collecting any personally identifiable
              information.
            </p>
            <p className="mb-2">
              Your participation in this study is entirely voluntary and you can
              withdraw at any time without any consequences. As the data
              collected is completely anonymous, it will not be possible to
              remove your data once it has been submitted.
            </p>
            <p className="mb-2">
              If you have any questions or concerns about this study, please
              feel free to contact
            </p>
            <p className="text-center">Akif Ozturk at:</p>
            <a
              className="text-blue-500 hover:text-blue-700 underline flex justify-center"
              href="mailto:m.a.ozturk@student.tudelft.nl"
            >
              m.a.ozturk@student.tudelft.nl
            </a>
          </div>

          <div className={boxStyles}>
            <h2 className={boxTitles}>Agreement</h2>

            <p className="mt-4 mb-2 text-center">
              By clicking on the “I Agree” button, you are indicating that you
              understand the above information and agree to participate in this
              study. Upon agreement, you will be immediately redirected to the
              CAPTCHA challenge
            </p>
          </div>

          <div className={"${boxStyles} flex justify-center"}>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                navigate("/startGame");
                /* Handle button click event */
              }}
            >
              I Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
