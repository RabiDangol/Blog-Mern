import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import React from "react";
import { Link, NavLink } from "react-router";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export const Header = () => {
  //const path = useLocation().pathname;
  return (
    <>
      <Navbar className="border-b-2 bg-white">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-base sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-lg text-white">
            Rabi's
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          ></TextInput>
        </form>
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch></AiOutlineSearch>
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
            <FaMoon></FaMoon>
          </Button>
          <Link to="/sign-in">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Sign In
            </Button>
          </Link>
          <NavbarToggle className="text-base" />
        </div>
        <NavbarCollapse className="text-lg pl-2 pb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold "
                : "text-white hover:text-red-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-white hover:text-red-600"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-white hover:text-red-600"
            }
          >
            Project
          </NavLink>

          {/* <NavLink active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </NavLink>
          <NavLink active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </NavLink>
          <NavLink active={path === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </NavLink> */}
        </NavbarCollapse>
        {/* <Navbar.Collapse>
          <Navbar.Link>
            <Link to="/">Home</Link>
          </Navbar.Link>
        </Navbar.Collapse> */}
      </Navbar>
    </>
  );
};
