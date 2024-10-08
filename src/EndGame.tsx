import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";

function EndGame() {
  const navigate = useNavigate();

  const isMobile = () =>
    /Mobile|Android|Tablet|iPad|iPhone/i.test(navigator.userAgent);
  const time = JSON.parse(sessionStorage.getItem("timerAtScore1000")!);

  useEffect(() => {
    // Retrieve all the shapes from the session storage
    const shape = JSON.parse(sessionStorage.getItem("shapeChoise")!);
    const seed = shape.seed;

    const followingShape = JSON.parse(
      sessionStorage.getItem("followingShape")!
    );
    console.log(followingShape);
    const insertData = async () => {
      const { data, error } = await supabase.from("Challenge").insert([
        {
          seed: seed,
          device: isMobile() ? "mobile" : "desktop",
          time: time,
          shapeData: followingShape,
          shapeDifficulty: shape.shapeDifficulty,
          label: "human",
        },
      ]);
      if (error) {
        console.error("Error inserting data: ", error);
      }
      if (data) {
        console.log("Data inserted successfully");
      }
    };

    insertData();
  });

  const resetChallenge = () => {
    navigate("/startGame");
  };

  const boxStyles = "border-2 p-4 mb-6 rounded-lg shadow-md bg-white";
  const boxTitles = "text-xl font-extrabold mb-4 text-center";

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <div className="text-left max-w-3xl mx-auto p-4">
          <div className={"border-2 p-4 mb-6 rounded-lg shadow-md bg-blue-100"}>
            <div className={boxStyles}>
              <h1 className={boxTitles}>Challenge Completed</h1>
              <p className="mb-2">
                Thank you for your participation! You have completed the
                challenge.
              </p>
              <p className="mb-2 bg-yellow-200 text-lg p-4 border-2 border-black rounded-md font-bold text-center">
                Your completion time: {time + "s"}
              </p>
              <p className="mb-2">
                If you want, you can restart the challenge by clicking the
                button below.
              </p>

              <div className={"${boxStyles} flex justify-center"}>
                <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                  onClick={resetChallenge}
                >
                  Restart Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EndGame;
