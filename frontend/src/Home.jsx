import React, { useState, useEffect } from "react";
import DateSelector from "./Components/home/DateSelector";
import LevelSelector from "./Components/home/LevelSelector";
import SemSelector from "./Components/home/SemSelector";
import CourseSelector from "./Components/home/CourseSelector";
import TimeslotSelector from "./Components/home/TimeSlotSelectorV2";
import TeacherSubjects from "./Components/home/TeacherSubjects";
import SubmitButton from "./Components/home/SubmitButton";
import AbsentCheckboxList from "./Components/home/AbsentCheckboxList";

function Home() {
  const [day, setDay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [level, setLevel] = useState();
  const [sem, setSem] = useState("");

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [timeSlots, setTimeSlots] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    if (selectedTimeSlot) {
      setSelectedTeacher(teachers[selectedTimeSlot]);
      setSelectedSubject(subjects[selectedTimeSlot]);
      setStartTime(timeSlots[selectedTimeSlot].starttime);
      setEndTime(timeSlots[selectedTimeSlot].endtime);
    }
  }, [selectedTimeSlot, teachers, subjects]);

  useEffect(() => {
    if (selectedCourse) {
      fetch(
        `${import.meta.env.REACT_APP_API_BASE_URL}/college/timetables?cid=${selectedCourse}&day=${day}`
      )
        .then((response) => response.json())
        .then((data) => {
          const ts = data.map((tt) => tt.timeslots);
          setTimeSlots(ts);
          const tr = data.map((tt) => tt.teachers.tname);
          setTeachers(tr);
          const sb = data.map((tt) => tt.subjects.sname);
          setSubjects(sb);
        })
        .catch((error) =>
          setError("Error fetching timeslots: " + error.message)
        );
    }
  }, [selectedCourse, day]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [count, setCount] = useState(0);

  const [error, setError] = useState(null);

  return (
    <>
      <main className="relative w-full min-h-[88svh] grid place-items-center overflow-hidden mt-3">
        <div className=" grid w-11/12 place-items-center grid-rows-2 md:grid-cols-2 md:grid-rows-1 text-black p-10 border-2 border-mybl rounded-xl">
          <div className=" w-full h-full flex flex-col items-center justify-between border-b-2 md:border-b-0 border-b-mybl md:border-r-2 md:border-r-mybl p-5">
            <DateSelector
              selectedDate={selectedDate}
              setDay={setDay}
              setSelectedDate={setSelectedDate}
            />

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

            <TeacherSubjects
              selectedTimeSlot={selectedTimeSlot}
              selectedTeacher={selectedTeacher}
              setSelectedTeacher={setSelectedTeacher}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
            />
          </div>
          <div className="w-full h-full flex flex-col p-5">
            <AbsentCheckboxList
              selectedStudents={selectedStudents}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedStudents={setSelectedStudents}
              count={count}
              setCount={setCount}
            />
            <SubmitButton
              selectedTimeSlot={selectedTimeSlot}
              selectedDate={selectedDate}
              startTime={startTime}
              endTime={endTime}
              selectedCourse={selectedCourse}
              sem={sem}
              selectedSubject={selectedSubject}
              selectedTeacher={selectedTeacher}
              count={count}
              selectedStudents={selectedStudents}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </main>
    </>
  );
}

export default Home;
