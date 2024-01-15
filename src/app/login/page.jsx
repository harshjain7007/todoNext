"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { Context } from "../../../Components/Clients";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context)

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      // console.log(email,
      //     password);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if(!data.success) return toast.error(data.message) 
      setUser(data.user)
    toast.success(data.message)
      // console.log({ data });
    } catch (error) {
      return toast.error(data.message) 
    }
  };

  if(user._id) redirect("/")

  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Password"
          />
          <button type="submit">Login</button>

          <p>OR</p>
          <Link href={"/register"}>New User</Link>
        </form>
      </section>
    </div>
    // <div>
    //   <form action="" onSubmit={loginHandler}>
    //   <input
    //       onChange={(e) => setEmail(e.target.value)}
    //       value={email}
    //       type="email"
    //       name=""
    //       id=""
    //       placeholder="Write Email"
    //     />
    //     <br />
    //     <input
    //       onChange={(e) => setPassword(e.target.value)}
    //       value={password}
    //       type="password"
    //       name=""
    //       id=""
    //       placeholder="Write Password"
    //     />
    //     <button type="submit">Login</button>
    //     <p>OR</p>
    //     <Link href={"/register"}>New User</Link>
    //   </form>
    // </div>
  );
};

// export const metadata = {
//     title: 'Login page',
//     description: 'this is the login page of todo project for practice nextjs',
//   }

export default Page;
