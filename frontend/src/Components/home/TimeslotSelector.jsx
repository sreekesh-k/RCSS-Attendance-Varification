import React from "react";
import Combobox from "../Combobox";

function TimeslotSelector({
  timeSlots,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedCourse,
}) {
  const timeslotOptions = timeSlots.map((timeslot, index) => ({
    value: index.toString(),
    label: `${timeslot.starttime} - ${timeslot.endtime}`,
  }));

  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="timeslot" className="font-bold">
        Timeslot:
      </label>
      <Combobox
        data={timeslotOptions}
        defaultValue={selectedTimeSlot}
        placeholder="--Select Timeslot--"
        noResultsMessage="No timeslot found."
        onChange={(value) => setSelectedTimeSlot(value)}
        disabled={!selectedCourse}
      />
    </div>
  );
}

export default TimeslotSelector;
