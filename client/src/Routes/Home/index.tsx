import React, { useState, useEffect } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 150;

  const handleType = () => {
    const dataText = [
      "My React Storybook - 장동원",
      "React 기반의 기술 저장소 :)"
    ];

    const i = loopNum % dataText.length;
    if (isDeleting) {
      setText(dataText[i].substring(0, text.length - 1));
    } else {
      setText(dataText[i].substring(0, text.length + 1));
    }

    if (!isDeleting && text === dataText[i]) {
      setIsDeleting(true);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      console.log(loopNum);
    }
  };

  useEffect(() => {
    setTimeout(handleType, typingSpeed);
  });

  return (
    <div>
      <h2 className="ityped" style={{ display: "inline-block" }}>
        {text}
      </h2>
      <span id="cursor"></span>
    </div>
  );
};

export default Home;
