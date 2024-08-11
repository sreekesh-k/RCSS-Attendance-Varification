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
    <Dialog>
      <DialogTrigger className="bg-mybl px-4 py-2 rounded-lg text-white m-3">
        Add New Course
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Course Details</DialogTitle>
          <DialogDescription>Re-check before submission</DialogDescription>

          <label htmlFor="course" className=" font-bold">
            CourseName:
          </label>
          <input
            type="text"
            name="course"
            id="course"
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
            placeholder="Enter A Course Name"
            className="bg-transparent border border-mybl rounded-lg px-1 w-full"
          />

          <label htmlFor="sem" className=" font-bold">
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
        </DialogHeader>
        <DialogFooter>
          <button
            type="button"
            disabled={!level}
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

export default CourseCreator;
