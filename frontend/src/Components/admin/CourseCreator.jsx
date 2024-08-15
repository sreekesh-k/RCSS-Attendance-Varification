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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function validateCourseName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  }

  function handleCourseNameChange(e) {
    const { value } = e.target;
    if (success) setSuccess("");
    if (validateCourseName(value) || value === "") {
      setError("");
    } else {
      setError("Course name should only contain letters and spaces.");
    }
    setCourseName(value);
  }

  function handleSemChange(e) {
    const value = Number(e.target.value);
    setSem(value);
    if (value >= 1 && value <= 6) {
      setError("");
    } else {
      setError("Semester must be between 1 and 6.");
    }
  }

  function handleSubmit() {
    if (error) return;

    setIsLoading(true);
    const course = { cname: courseName, sem: sem, level: level };

    fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/college/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess("New Course Created");
        setCourseName("");
        setSem("1");
      })
      .catch(() => {
        setError("Error: Could not Create New Course");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-mybl px-4 py-2 rounded-lg text-white m-3 w-full">
        Add New Course
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Course Details</DialogTitle>
          <DialogDescription>Re-check before submission</DialogDescription>
          <label htmlFor="course" className="font-bold">
            Course Name:
          </label>
          <input
            type="text"
            name="course"
            id="course"
            value={courseName}
            onChange={handleCourseNameChange}
            placeholder="Enter a Course Name"
            className="bg-transparent border border-mybl rounded-lg px-1 w-full"
            disabled={isLoading}
          />
          <label htmlFor="sem" className="font-bold">
            Semester:
          </label>
          <input
            type="number"
            min={1}
            max={6}
            name="sem"
            id="sem"
            disabled={!courseName || isLoading}
            value={sem}
            onChange={handleSemChange}
            className="bg-transparent border border-mybl rounded-lg px-1 w-full"
          />
          <div>
            <label>
              <input
                type="radio"
                name="level"
                value="UG"
                disabled={!courseName || isLoading}
                onChange={() => setLevel("UG")}
              />
              UG
            </label>
            <label>
              <input
                type="radio"
                name="level"
                value="PG"
                disabled={!courseName || isLoading}
                onChange={() => setLevel("PG")}
              />
              PG
            </label>
          </div>
        </DialogHeader>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <DialogFooter>
          <button
            type="button"
            disabled={!level || error || isLoading}
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

export default CourseCreator;
