import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="relative mb-10 h-[88svh] w-full grid grid-cols-1 gap-10 p-10 py-8 sm:py-14 lg:grid-cols-[1.5fr_1fr] place-items-center ">
        <div className="flex flex-col w-11/12">
          <h1 className="font-fugas relative text-2xl md:text-6xl font-bold uppercase">
            Attendance Verification System
          </h1>
          <div className="mt-4">
            <h1 className="font-fugaz md:text-2xl drop-shadow-lg text-slate-500 font-semibold">
              Welcome to our attendance verification system, designed to
              simplify the manual entry process
            </h1>
          </div>
          <div className="grid h-full w-full grid-rows-2 place-items-center gap-[10%] py-10 md:grid-cols-2 md:grid-rows-1">
            <Link
              to="/mark"
              className="block h-full w-full bg-btn-main p-3 text-center text-white bg-mybl md:text-xl hover:scale-105 "
            >
              Mark Attendance
            </Link>
            <Link
              to="/download"
              className="block w-full border border-mybl bg-transparent p-3 text-center md:text-xl hover:scale-105"
            >
              View Records
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
