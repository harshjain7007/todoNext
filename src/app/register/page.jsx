"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { Context } from "../../../Components/Clients";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      // console.log(email,
      //     password);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
      // console.log({ data });
    } catch (error) {
      return toast.error(data.message);
    }
  };

  if (user._id) redirect("/");

  return (
    <div className="login">
      <section>
        <form onSubmit={registerHandler}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Name"
          />
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
          <button type="submit">Sign Up</button>
          <p>OR</p>
          <Link href={"/login"}>Log In</Link>
        </form>
      </section>
    </div>
    // <div>
    //   <form onSubmit={registerHandler}>
    //     <input
    //       onChange={(e) => setName(e.target.value)}
    //       value={name}
    //       type="text"
    //       name=""
    //       id=""
    //       placeholder="Write Name"
    //     />{" "}
    //     <br />
    //     <input
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
    //     <button type="submit">Sign Up</button>
    //     <p>OR</p>
    //     <Link href={"/login"}>Click here for login</Link>
    //   </form>
    // </div>
  );
};

// export const metadata = {
//     title: 'register page',
//     description: 'this is the register page of todo project for practice nextjs',
//   }

export default Page;
