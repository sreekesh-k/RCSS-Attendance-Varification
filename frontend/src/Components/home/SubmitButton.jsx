import React from "react";

function SubmitButton({
  selectedTimeSlot,
  selectedDate,
  startTime,
  endTime,
  selectedCourse,
  sem,
  selectedSubject,
  selectedTeacher,
  count,
  selectedStudents,
}) {
  const handleSubmit = () => {
    const logEntry = {
      date: selectedDate,
      start_time: startTime,
      end_time: endTime,
      programme: selectedCourse,
      sem: sem,
      subject: selectedSubject,
      faculty_Name: selectedTeacher,
      total_no_of_absenties: count,
      students: selectedStudents,
    };

    fetch("http://localhost:5000/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logEntry),
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
  };
  return (
    <div>
      <button
        type="button"
        disabled={!selectedTimeSlot}
        className={`${
          selectedTimeSlot ? "bg-mybl cursor-pointer  bg-opacity-75 text-white" : "bg-slate-500"
        } mt-5 px-4 py-2 rounded-lg w-full`}
        onClick={handleSubmit}
      >
        SUBMIT
      </button>
    </div>
  );
}

export default SubmitButton;
