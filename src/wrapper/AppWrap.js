import React from "react";

const AppWrap = (Component, idName) =>
  function HOC({ onHandleClickProject, handleClick }) {
    return (
      <section className="wrapper" id={idName}>
        <Component onHandleClickProject={onHandleClickProject} handleClick={handleClick} />
      </section>
    );
  };
export default AppWrap;
