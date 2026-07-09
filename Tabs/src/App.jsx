import React from "react";
import tabsData from "./assets/data";
import { useState } from "react";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleTab = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };
  return (
    <>
      <div className="tabs ">
        {tabsData.map((tab, index) => {
          return (
            <button
              className={`tablinks ${currentIndex === index && "active"}`}
              onClick={() => handleTab(index)}
              key={tab.id}
            >
              {tab.title}
            </button>
          );
        })}
      </div>
      <div className="tabs_container">
        {tabsData.map((tab, index) => {
          return (
            <div
              className="tabContent"
              style={{
                display: `${currentIndex === index ? "block" : "none"}`,
              }}
            >
              <h1>{tab.title}</h1>
              <p>{tab.content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
