import React, { useState, useEffect, createRef } from "react";
import "./style.css";
import { DropdownArrowIcon } from "../ArrowIcon";

const Select = ({ hourData, minuteData }) => {
  const [hourState, setHourState] = useState({
    isOpen: false,
    hourTitle: "Hour",
  });
  const [minuteState, setMinuteState] = useState({
    isOpen: false,
    canOpen: false,
    minuteTitle: "Minute",
    minuteDataset: [],
  });
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  const className = `time-slot ${
    selectedHour && selectedMinute ? " completed" : ""
  }`;

  const hourRef = createRef();
  const minuteRef = createRef();

  const handleClick = (e) => {
    if (
      hourRef.current.contains(e.target) ||
      minuteRef.current.contains(e.target)
    ) {
      return;
    }
    setHourState({ ...hourState, isOpen: false });
    setMinuteState({ ...minuteState, isOpen: false });
  };

  const onHourChange = (item) => {
    setHourState({ ...hourState, isOpen: false });
    setSelectedHour(item);
    const filteredMinuteData = minuteData[`${item}`];
    setMinuteState({
      ...minuteState,
      canOpen: true,
      minuteDataset: filteredMinuteData,
    });
  };

  const onMinuteChange = (item) => {
    setMinuteState({ ...minuteState, isOpen: false });
    setSelectedMinute(item.MinuteTime);
  };
  const onHourOpen = () => {
    setHourState({ ...hourState, isOpen: !hourState.isOpen });
  };

  const onMinuteOpen = () => {
    if (!minuteState.canOpen) return;
    setMinuteState({ ...minuteState, isOpen: !minuteState.isOpen });
  };

  const hourList = hourData.map((item) => (
    <li key={item} className="item" onClick={() => onHourChange(item)}>
      {item}
    </li>
  ));

  const minuteList = minuteState.minuteDataset?.map((item) => (
    <li
      key={item?.StartDateTime}
      className="item"
      onClick={() => onMinuteChange(item)}
      style={item.IsSunsetTimeslot ? { color: "red" } : { color: "blue" }}
    >
      {item.FullTime}
    </li>
  ));

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });

  return (
    <div className={className}>
      <div className="select" ref={hourRef}>
        <div className="content" onClick={onHourOpen}>
          <div className="wrapper">
            <span className={`title${selectedHour ? " up" : ""}`}>
              {hourState.hourTitle}
            </span>
            {selectedHour ? <span className="name">{selectedHour}</span> : null}
          </div>
          <DropdownArrowIcon className="arrow" isActive={hourState.isOpen} />
        </div>
        {hourState.isOpen ? <ul className="options">{hourList}</ul> : null}
      </div>
      <span style={{ fontSize: "32px" }}>:</span>
      <div className="select" ref={minuteRef}>
        <div className="content" onClick={onMinuteOpen}>
          <div className="wrapper">
            <span className={`title${selectedMinute ? " up" : ""}`}>
              {minuteState.minuteTitle}
            </span>
            {selectedMinute ? (
              <span className="name">{selectedMinute}</span>
            ) : null}
          </div>
          <DropdownArrowIcon className="arrow" isActive={minuteState.isOpen} />
        </div>
        {minuteState.isOpen ? <ul className="options">{minuteList}</ul> : null}
      </div>
    </div>
  );
};

export default Select;
