import React, { useState } from "react";

function TeacherCreator() {
  const [teacherName, setTeacherName] = useState("");

  function handleSubmit() {
    const teacher = { tname: teacherName };
    fetch("http://localhost:5000/college/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacher),
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
    <div className=" bg-mybl bg-opacity-30 p-5 mt-5  relative">
      <div className="grid place-content-center grid-cols-3 px-5">
        <div className="flex space-x-10 w-full">
          <div className="flex space-x-5">
            <label htmlFor="subject" className=" font-bold">
              FacultyName:
            </label>
            <input
              type="text"
              name="teacher"
              id="teacher"
              value={teacherName}
              onChange={(e) => {
                setTeacherName(e.target.value);
              }}
              placeholder="Enter A Course Name"
              className="bg-transparent border border-mybl rounded-lg px-1 w-full"
            />
          </div>
        </div>
        <div className="grid place-items-center ">
          <button
            type="button"
            disabled={!teacherName}
            className=" bg-mybl px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
        <div className="px-4 py-2 grid place-items-center">
          <h1 className="font-bold ">Add New Faculty</h1>
        </div>
      </div>
    </div>
  );
}

export default TeacherCreator;
