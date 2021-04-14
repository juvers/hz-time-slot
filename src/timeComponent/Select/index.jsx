import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { DropdownArrowIcon } from "../ArrowIcon";

const Select = ({ hourData, minuteData }) => {
  const hourRef = useRef();
  const minuteRef = useRef();
  const [hourState, setHourState] = useState({
    isOpen: false,
    hourTitle: "Hour",
  });
  const [minuteState, setMinuteState] = useState({
    isOpen: false,
    canOpen: false,
    hasOpened: false,
    minuteTitle: "Minute",
    minuteDataset: [],
    minuteObject: {},
  });
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  const classNameTimeSelected = `time-slot ${
    selectedHour && minuteState.hasOpened ? " completed" : ""
  }`;

  const classNameAllowOrUnallow = (item) =>
    !minuteData[`${item}`][minuteData[`${item}`].length - 1].AvailableCapacity
      ? "item unallow"
      : "item";

  const classNameSunsetOrNotsunset = (item) =>
    item.IsSunsetTimeslot ? "item sunset" : "item";

  const handleClick = ({ target }) => {
    if (
      hourRef.current.contains(target) ||
      minuteRef.current.contains(target)
    ) {
      return;
    }
    setHourState({ ...hourState, isOpen: false });
    setMinuteState({ ...minuteState, isOpen: false });
  };

  const onHourChange = (item) => {
    // Thinking Process: This prevents click if availability of last element on array is zero, viz available capacity = 0
    if (
      !minuteData[`${item}`][minuteData[`${item}`].length - 1].AvailableCapacity
    )
      return;
    setHourState({ ...hourState, isOpen: false });
    setSelectedHour(item);
    const filteredMinuteData = minuteData[`${item}`];
    setMinuteState({
      ...minuteState,
      canOpen: true,
      minuteDataset: filteredMinuteData,
      hasOpened: false,
    });
    // N.B. set to null or to 1st minute value as ff: filteredMinuteData.MinuteTime
    // Thinking Process: This returns the minute title to the display
    setSelectedMinute(null);
  };

  const onMinuteChange = (item) => {
    setMinuteState({
      ...minuteState,
      isOpen: false,
      hasOpened: true,
      minuteObject: item,
    });
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
    <li
      key={item}
      className={`${classNameAllowOrUnallow(item)}`}
      onClick={() => onHourChange(item)}
    >
      {item}
    </li>
  ));

  const minuteList = minuteState.minuteDataset?.map((item) => (
    <li
      key={item?.StartDateTime}
      className={`${classNameSunsetOrNotsunset(item)}`}
      onClick={() => onMinuteChange(item)}
    >
      {item.FullTime}
    </li>
  ));

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });

  return (
    <div className={classNameTimeSelected}>
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
      <button
        className={"button"}
        onClick={() =>
          console.log(
            "Logging object with all values: ",
            minuteState.minuteObject
          )
        }
        disabled={!minuteState.hasOpened}
      >
        Continue
      </button>
    </div>
  );
};

export default Select;
