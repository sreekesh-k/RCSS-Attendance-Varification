import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
function TimeslotCreator() {
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  function handleSubmit() {
    const timeslots = { starttime: startTime, endtime: endTime };
    fetch("http://localhost:5000/college/timeslots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timeslots),
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert("Success");
        console.log("Log entry created:", data);
        window.location.reload();
      })
      .catch((error) => {
        window.alert("Error");
        console.error("Error creating log entry:", error);
      });
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-mybl px-4 py-2 rounded-lg text-white m-3 w-full">
        Add New TimeSlots
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter TimeSlot Details</DialogTitle>
          <DialogDescription>Re-check before submission</DialogDescription>

          <div className="flex gap-3">
            <div>
              <label htmlFor="startTime" className=" font-bold">
                StartTime:
              </label>
              <input
                type="text"
                name="startTime"
                id="startTime"
                value={startTime}
                onChange={(e) => {
                  setstartTime(e.target.value);
                }}
                placeholder="9:00"
                className="bg-transparent border border-mybl rounded-lg px-1 w-fit"
              />
            </div>
            <div>
              <label htmlFor="endTime" className=" font-bold">
                EndTime:
              </label>
              <input
                type="text"
                name="endTime"
                id="endTime"
                value={endTime}
                onChange={(e) => {
                  setendTime(e.target.value);
                }}
                placeholder="12:00"
                className="bg-transparent border border-mybl rounded-lg px-1 "
              />
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <button
            type="button"
            disabled={!(startTime && endTime)}
            className=" bg-mybl px-4 py-2 rounded-lg text-white"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TimeslotCreator;
