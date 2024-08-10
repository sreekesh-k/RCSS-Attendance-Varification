import React from "react";
import { useEffect } from "react";

function CourseSelector({
  courses,
  selectedCourse,
  setSelectedCourse,
  sem,
  level,
  setCourses,
  setTimeSlots,
  setTeachers,
  setSubjects,
  day,
  setError,
}) {
  useEffect(() => {
    if (level && sem) {
      fetch(`http://localhost:5000/college/courses?level=${level}&sem=${sem}`)
        .then((response) => response.json())
        .then((data) => {
          setCourses(data);
        })
        .catch((error) => setError("Error fetching courses: " + error.message));
    }
  }, [level, sem]);

  useEffect(() => {
    if (selectedCourse) {
      fetch(
        `http://localhost:5000/college/timetables?cid=${selectedCourse}&day=${day}`
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

  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="course" className=" font-bold">
        Course:
      </label>
      <select
        id="course"
        disabled={!sem}
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="bg-transparent border border-mybl rounded-lg px-1 w-full text-center"
      >
        <option value="" className="text-black">
          --Select Course--
        </option>
        {courses.map((course) => (
          <option key={course.cid} value={course.cid} className="text-black">
            {course.cname}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CourseSelector;
