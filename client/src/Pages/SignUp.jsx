import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20 mx-2">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* leftside */}
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-lg text-white">
              Rabi's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            You can sign up with your email and password or with Google..
          </p>
        </div>
        {/* rightside */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <label value="Your username" className="text-black">
                Your UserName
              </label>
              <TextInput type="text" placeholder="Username" id="username" />
              {/* <label htmlFor="Your username">Username</label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="rounded-lg"
              /> */}
            </div>
            <div>
              <label value="Your email">Your Email</label>
              <TextInput type="text" placeholder="Email" id="email" />
            </div>
            <div>
              <label value="Your password">Enter Your Password </label>
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button
              type="submit"
              className="px-2 py-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-lg text-white"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              {" "}
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
