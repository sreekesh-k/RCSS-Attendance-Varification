import React, { useState } from "react";

function CourseCreator() {
  const [courseName, setCourseName] = useState("");
  const [sem, setSem] = useState(1);
  const [level, setLevel] = useState("");
  
  function handleSubmit() {
    const course = { cname: courseName, sem: sem, level: level };
    fetch("http://localhost:5000/college/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
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
      <div className="grid place-content-center grid-cols-[auto_1fr_1fr] px-5">
        <div className="flex space-x-10 w-full">
          <div className="flex space-x-5">
            <label htmlFor="subject" className=" font-bold">
              CourseName:
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              placeholder="Enter A Course Name"
              className="bg-transparent border border-mybl rounded-lg px-1 w-full"
            />
          </div>
          <div className="flex space-x-5">
            <label htmlFor="subject" className=" font-bold">
              SEM:
            </label>
            <input
              type="number"
              min={1}
              max={6}
              name="sem"
              id="sem"
              disabled={!courseName}
              value={sem}
              onChange={(e) => {
                setSem(e.target.value);
              }}
              className="bg-transparent border border-mybl rounded-lg px-1 w-full"
            />
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="level"
                value="UG"
                disabled={!courseName}
                onChange={() => setLevel("UG")}
              />
              UG
            </label>
            <label>
              <input
                type="radio"
                name="level"
                value="PG"
                disabled={!courseName}
                onChange={() => setLevel("PG")}
              />
              PG
            </label>
          </div>
        </div>
        <div className="grid place-items-center ">
          <button
            type="button"
            disabled={!courseName && !sem && !level}
            className=" bg-mybl px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
        <div className="px-4 py-2 grid place-items-center">
          <h1 className="font-bold ">Add New Course</h1>
        </div>
      </div>
    </div>
  );
}

export default CourseCreator;
