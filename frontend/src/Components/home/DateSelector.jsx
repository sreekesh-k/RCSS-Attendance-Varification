import React from "react";

function DateSelector({ selectedDate, setDay, setSelectedDate }) {
  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    const options = { weekday: "long" };
    const dayOfWeek = new Intl.DateTimeFormat("en-US", options).format(date);
    setDay(dayOfWeek);
    setSelectedDate(event.target.value);
  };

  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="date" className="font-bold">
        Date:
      </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="bg-transparent border border-mybl rounded-lg px-1 w-full text-center"
      />
    </div>
  );
}

export default DateSelector;
