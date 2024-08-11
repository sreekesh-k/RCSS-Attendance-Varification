import React from "react";

function TimeslotSelectorV2({
  timeSlots,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedCourse,
}) {
  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="timeslot" className=" font-bold">
        Timeslot:
      </label>
      <select
        id="timeslot"
        disabled={!selectedCourse}
        value={selectedTimeSlot}
        onChange={(e) => setSelectedTimeSlot(e.target.value)}
        className="bg-transparent border border-mybl rounded-lg px-1 w-full text-center"
      >
        <option value="" className="text-black">
          --Select Timeslot--
        </option>
        {timeSlots.map((timeslot, index) => (
          <option key={timeslot.tsid} value={index} className="text-black">
            {timeslot.starttime} - {timeslot.endtime}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimeslotSelectorV2;