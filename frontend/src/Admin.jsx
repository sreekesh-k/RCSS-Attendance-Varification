import React, { useState } from "react";
import CourseCreator from "./Components/admin/CourseCreator";
import TeacherCreator from "./Components/admin/TeacherCreator";
import SubjectCreator from "./Components/admin/SubjectCreator";
function Admin() {
  return (
    <>
      <main className="px-5">
        <CourseCreator/>
        <TeacherCreator/>
        <SubjectCreator/>
      </main>
    </>
  );
}

export default Admin;
