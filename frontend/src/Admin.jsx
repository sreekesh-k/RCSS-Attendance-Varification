import React, { useState } from "react";
import CourseCreator from "./Components/admin/CourseCreator";
import TeacherCreator from "./Components/admin/TeacherCreator";
import SubjectCreator from "./Components/admin/SubjectCreator";
import TimeslotCreator from "./Components/admin/TimeslotCreator";
import TimeTableCreator from "./Components/admin/TimeTableCreator";
function Admin() {
  return (
    <>
      <main className="px-5">
        <CourseCreator />
        <TeacherCreator />
        <SubjectCreator />
        <TimeslotCreator />
        <TimeTableCreator />
      </main>
    </>
  );
}

export default Admin;
