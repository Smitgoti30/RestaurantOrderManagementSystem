import React, { useState, useRef } from "react";
import Login from "./Login";

const Authentication = () => {
  const [isLogginActive, setIsLogginActive] = useState(true);
  const rightSideRef = useRef(null);

  const changeState = () => {
    setIsLogginActive((prevState) => !prevState);
    const rightSide = rightSideRef.current;
    if (isLogginActive) {
      rightSide.classList.remove("right");
      rightSide.classList.add("left");
    } else {
      rightSide.classList.remove("left");
      rightSide.classList.add("right");
    }
  };

  return (
    <div className="App">
      <div className="login">
        <div className="sp-base-container" ref={rightSideRef}>
          {isLogginActive ? (
            <Login containerRef={(ref) => (ref = rightSideRef)} />
          ) : (
            <Register containerRef={(ref) => (ref = rightSideRef)} />
          )}
        </div>
        <RightSide
          current={isLogginActive ? "Register" : "Login"}
          containerRef={rightSideRef}
          onClick={changeState}
        />
      </div>
    </div>
  );
};

const RightSide = ({ current, containerRef, onClick }) => {
  return (
    <div className="right-side" ref={containerRef} onClick={onClick}>
      <div className="inner-container">
        <div className="text">{current}</div>
      </div>
    </div>
  );
};

export default Authentication;
