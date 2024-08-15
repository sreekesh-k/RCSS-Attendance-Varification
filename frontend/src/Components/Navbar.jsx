import React from "react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

function Navbar() {
  return (
    <header className="w-full h-fit grid place-items-center sticky  top-0 z-10 bg-slate-50 py-2">
      <div className=" flex items-center justify-center px-5 md:px-10 p-2 w-11/12 h-[5svh] xl:h-[8svh]">
        <div class="flex-1 relative flex h-full items-center justify-start">
          <div class=" relative h-full w-fit">
            <img
              src="/logo.png"
              alt="Logo"
              class=" aspect-square h-full object-contain"
            />
          </div>
          <div class="relative flex items-center justify-start font-valorant text-sm sm:text-2xl text-green-600">
            <Link to="/" className="hover:text-mybl">
              RCSS
            </Link>
          </div>
        </div>
        <nav className="flex-1 text-slate-600 font-semibold text-sm sm:text-base">
          <ul className="hidden xl:flex items-center justify-end gap-5">
            <li>
              <Link to="/" className="hover:text-mybl">
                Home
              </Link>
            </li>
            <li>
              <Link to="/mark" className="hover:text-mybl">
                Mark Attendance
              </Link>
            </li>
            <li>
              <Link to="/download" className="hover:text-mybl">
                Download
              </Link>
            </li>
            <li>
              <Link
                to="/Admin"
                className="hover:bg-green-900 bg-mybl text-white py-1 px-3 rounded-md "
              >
                Admin
              </Link>
            </li>
          </ul>
          <div className="flex justify-end items-center xl:hidden ">
            <Sheet>
              <SheetTrigger>
                <div className="grid items-center w-[1.2rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 80"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <rect width="80" height="10" />
                    <rect y="20" width="80" height="10" />
                    <rect y="40" width="80" height="10" />
                  </svg>
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      to="/"
                      className="hover:text-mybl text-green-600 text-xl font-fugaz font-bold"
                    >
                      Attendance Verification System
                    </Link>
                    <hr />
                  </SheetTitle>
                </SheetHeader>
                <ul className="mt-5 flex flex-col gap-5">
                  <li>
                    <SheetClose asChild>
                      <Link to="/" className="hover:text-mybl font-semibold">
                        <button type="button">Home</button>
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        to="/mark"
                        className="hover:text-mybl font-semibold"
                      >
                        <button type="button">Mark Attendance</button>
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        to="/download"
                        className="hover:text-mybl font-semibold"
                      >
                        <button type="button">Download</button>
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        to="/Admin"
                        className="hover:bg-green-900  text-mybl font-semibold "
                      >
                        Admin
                      </Link>
                    </SheetClose>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
