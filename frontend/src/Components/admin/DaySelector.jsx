import React from "react";

function DaySelector({ day, setDay , isLoading}) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div className="flex gap-5">
      <label className="font-bold">Select Day</label>
      <select
        className="bg-transparent border border-mybl rounded-lg w-fit text-center"
        value={day}
        disabled={isLoading}
        onChange={(e) => setDay(e.target.value)}
      >
        <option value="">--Select a day--</option>
        {daysOfWeek.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DaySelector;
