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
  const [selectedCourse, setSelectedCourse] = useState("");

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:5000/college/timeslots`)
        .then((response) => response.json())
        .then((data) => {
          setTimeSlots(data);
        })
        .catch((error) =>
          setError("Error fetching timeslots: " + error.message)
        );
    }
  }, [selectedCourse]);

  const handleSubmit = () => {
    const timetable = {
      day: day,
      cid: selectedCourse,
      tsid: selectedTimeSlot,
      tid: selectedTeacher,
      sid: selectedSubject,
    };
    console.log("Sending Timetable:", JSON.stringify(timetable));

    fetch("http://localhost:5000/college/timetables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timetable),
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
    <Dialog>
      <DialogTrigger className="bg-mybl px-4 py-2 rounded-lg text-white m-3">
        Add New TimeTable
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Enter TimeTable Details</DialogTitle>
          <DialogDescription>Re-check before submission</DialogDescription>
        </DialogHeader>

        <DaySelector day={day} setDay={setDay} />
        <LevelSelector setLevel={setLevel} day={day} />
        <SemSelector sem={sem} setSem={setSem} level={level} />
        <CourseSelector
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          sem={sem}
          level={level}
          setCourses={setCourses}
          setError={setError}
        />
        <TimeslotSelector
          timeSlots={timeSlots}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          selectedCourse={selectedCourse}
        />
        <TeacherSelector
          selectedTimeSlot={selectedTimeSlot}
          teachers={teachers}
          setTeachers={setTeachers}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
        />
        <SubjectSelector
          selectedTeacher={selectedTeacher}
          subjects={subjects}
          setSelectedSubject={setSelectedSubject}
          selectedSubject={selectedSubject}
          setSubjects={setSubjects}
        />

        <DialogFooter>
          <button
            type="button"
            className="bg-mybl px-4 py-2 rounded-lg text-white"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TimeTableCreator;
