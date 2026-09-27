import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Signin from "../Pages/Signin";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import Projects from "../Pages/Projects";
import CreatePost from "../Pages/CreatePost";
import PrivateRoute from "../components/PrivateRoute";
import OnlyAdminPrivateRoute from "../components/OnlyAdminPrivateRoute";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />}></Route>
        </Route>
        <Route path="/projects" element={<Projects />}></Route>
      </Routes>
    </>
  );
};

export default Router;
