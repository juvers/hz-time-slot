import Select from "./timeComponent/Select";
import data from "./data/data.json";

import "./App.css";

const extractTime = (x) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
  };

  const fullTime = new Date(x).toLocaleTimeString("en-US", options);

  const hourTime =
    fullTime.slice(0, fullTime.indexOf(":")) +
    fullTime.slice(fullTime.indexOf(" "));

  const minuteTime = fullTime.slice(fullTime.indexOf(":"));
  return {
    FullTime: fullTime,
    HourTime: hourTime,
    MinuteTime: minuteTime,
  };
};

const recreateData = (arr) => {
  return arr
    .map((x) => {
      return {
        ...x,
        ...extractTime(x.StartDateTime),
      };
    })
    .reduce((acc, curr) => {
      let key = curr.HourTime;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});
};

// TODO: Fetch data to get updated data
function App() {
  return (
    <div className="App">
      <Select
        hourData={Object.keys(recreateData(data))}
        minuteData={recreateData(data)}
      />
    </div>
  );
}

export default App;
