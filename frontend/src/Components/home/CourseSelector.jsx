import React, { useEffect } from "react";
import Combobox from "../Combobox";

function CourseSelector({
  courses,
  selectedCourse,
  setSelectedCourse,
  sem,
  level,
  setCourses,
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

 

  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="course" className="font-bold">
        Course:
      </label>
      <Combobox
        data={courses.map((course) => ({
          value: course.cid,
          label: course.cname,
        }))}
        defaultValue={selectedCourse}
        placeholder="--Select Course--"
        noResultsMessage="No courses found."
        onChange={(value) => setSelectedCourse(value)}
        disabled={!sem}
      />
    </div>
  );
}

export default CourseSelector;
