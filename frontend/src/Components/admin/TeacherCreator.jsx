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
    <Dialog>
      <DialogTrigger className="bg-mybl px-4 py-2 rounded-lg text-white m-3">
        Add New Faculty
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Faculty Details</DialogTitle>
          <DialogDescription>Re-check before submission</DialogDescription>

          <label htmlFor="teacher" className=" font-bold">
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
            placeholder="Enter Faculty Name"
            className="bg-transparent border border-mybl rounded-lg px-1 w-full"
          />
        </DialogHeader>
        <DialogFooter>
          <button
            type="button"
            disabled={!teacherName}
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

export default TeacherCreator;
