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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateTime(time) {
    const regex = /^(0[1-9]|1[0-2]):[0-5][0-9]$/;
    return regex.test(time);
  }

  function handleStartChange(e) {
    const { value } = e.target;
    if (success) setSuccess("");
    if (validateTime(value) || value === "") {
      setError("");
    } else {
      setError("Time Format should me HH:MM and must be between 01:00 - 12:59");
    }
    setstartTime(value);
  }

  function handleEndChange(e) {
    const { value } = e.target;
    if (success) setSuccess("");
    if (validateTime(value) || value === "") {
      setError("");
    } else {
      setError("Time Format should me HH:MM and must be between 01:00 - 12:59");
    }
    setendTime(value);
  }
  function handleSubmit() {
    if (error) return;
    setIsLoading(true);
    const timeslots = { starttime: startTime, endtime: endTime };
    fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/college/timeslots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timeslots),
    })
    .then((response) => response.json())
    .then((data) => {
      setSuccess("New TimeSlot Created");
      setstartTime("");
      setendTime("");
    })
    .catch((error) => {
      setError("Error: Could not Create New TimeSlot");
    })
    .finally(() => {
      setIsLoading(false);
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

          <div className="flex flex-col items-start justify-center gap-3">
            <label htmlFor="startTime" className=" font-bold">
              StartTime:
            </label>
            <input
              type="text"
              name="startTime"
              id="startTime"
              value={startTime}
              disabled={isLoading}
              onChange={handleStartChange}
              placeholder="09:00"
              className="bg-transparent border border-mybl rounded-lg px-1 w-full"
            />

            <label htmlFor="endTime" className=" font-bold">
              EndTime:
            </label>
            <input
              type="text"
              name="endTime"
              id="endTime"
              value={endTime}
              disabled={isLoading}
              onChange={handleEndChange}
              placeholder="11:00"
              className="bg-transparent border border-mybl rounded-lg px-1 w-full "
            />
          </div>
        </DialogHeader>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <DialogFooter>
          <button
            type="button"
            disabled={!(startTime && endTime) || error || isLoading}
            className="bg-mybl px-4 py-2 rounded-lg text-white"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white inline mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span>Submiting...</span>
              </>
            ) : (
              "SUBMIT"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TimeslotCreator;
