import React from "react";

function Footer() {
  return (
    <footer className="relative bg-slate-100 px-4 py-8 font-roboto text-black mt-10">
      <div className=" gl:mx-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-8 lg:flex-row">
          <div className="w-full">
            <h2 className="mb-2 font-fugaz text-2xl text-green-600">
              Attendance Verification
            </h2>
            <p className="font-Ubuntu mb-4 text-sm">
              Simplify Manual entries with simple User Interface.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-gray-700 pt-4 md:flex-row">
          <p className="mb-4 text-sm md:mb-0">
            &copy; 2024 RCSS. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://rajagiri.edu/"
              className="text-sm transition-colors duration-300 hover:text-green-600"
            >
              Rajagiri College of Social Sciences (Autonomous )
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
