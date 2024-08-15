import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import DaySelector from "./DaySelector";
import LevelSelector from "../home/LevelSelector";
import SemSelector from "../home/SemSelector";
import CourseSelector from "../home/CourseSelector";
import TimeslotSelector from "../home/TimeslotSelector";
import TeacherSelector from "../home/Teacherselector";
import SubjectSelector from "../home/SubjectSelector";

function TimeTableCreator() {
  const [day, setDay] = useState("");
  const [level, setLevel] = useState();
  const [sem, setSem] = useState("");

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    name: "",
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCourse.id) {
      fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/college/timeslots`)
        .then((response) => response.json())
        .then((data) => {
          setTimeSlots(data);
        })
        .catch((error) =>
          setError("Error fetching timeslots: " + error.message)
        );
    }
  }, [selectedCourse.id]);

  const handleSubmit = () => {
    if (error) return;
    setIsLoading(true);
    const timetable = {
      day: day,
      cid: selectedCourse.id,
      tsid: selectedTimeSlot,
      tid: selectedTeacher,
      sid: selectedSubject,
    };
    console.log("Sending Timetable:", JSON.stringify(timetable));

    fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/college/timetables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timetable),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess("New TimeTable Created");
        setDay("");
        setSem("");
        setCourses([]);
        setSubjects([]);
        setTeachers([]);
        setTimeSlots([]);
        setSelectedTimeSlot("");
        setSelectedCourse("");
        setSelectedCourse("");
        setSelectedTeacher("");
      })
      .catch((error) => {
        setError("Error: Could not Create New TimeTable");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-mybl px-4 py-2 rounded-lg text-white m-3 w-full">
        Add New TimeTable
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Enter TimeTable Details</DialogTitle>
          <DialogDescription>Re-check before submission</DialogDescription>
        </DialogHeader>

        <DaySelector day={day} setDay={setDay} isLoading={isLoading}/>
        <LevelSelector setLevel={setLevel} day={day} isLoading={isLoading}/>
        <SemSelector sem={sem} setSem={setSem} level={level} isLoading={isLoading}/>
        <CourseSelector
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          sem={sem}
          level={level}
          setCourses={setCourses}
          setError={setError}
          isLoading={isLoading}
        />
        <TimeslotSelector
          timeSlots={timeSlots}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          selectedCourse={selectedCourse.id}
          isLoading={isLoading}
        />
        <TeacherSelector
          selectedTimeSlot={selectedTimeSlot}
          teachers={teachers}
          setTeachers={setTeachers}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
          isLoading={isLoading}
        />
        <SubjectSelector
          selectedTeacher={selectedTeacher}
          subjects={subjects}
          setSelectedSubject={setSelectedSubject}
          selectedSubject={selectedSubject}
          setSubjects={setSubjects}
          isLoading={isLoading}
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <DialogFooter>
          <button
            type="button"
            disabled={!(selectedSubject && day) || error || isLoading}
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

export default TimeTableCreator;
