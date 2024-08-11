import React, { useState } from "react";
import CourseCreator from "./Components/admin/CourseCreator";
import TeacherCreator from "./Components/admin/TeacherCreator";
import SubjectCreator from "./Components/admin/SubjectCreator";
import TimeslotCreator from "./Components/admin/TimeslotCreator";
import TimeTableCreator from "./Components/admin/TimeTableCreator";
function Admin() {
  return (
    <>
      <main className="px-5 grid place-items-center h-[88svh]">
        <div className=" grid grid-cols-2 w-fit place-items-center gap-5">
          <CourseCreator />
          <TeacherCreator />
          <SubjectCreator />
          <TimeslotCreator />
          <TimeTableCreator />
        </div>
      </main>
    </>
  );
}

export default Admin;
