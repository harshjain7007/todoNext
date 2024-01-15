import React from "react";
import Link from "next/link";
import { LogoutButton } from "../../Components/Clients";

const Header = () => {
  return (
    <div className="header">
      <div>
        <h2>Todo</h2>
      </div>
      <article>
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
        <LogoutButton />
      </article>
    </div>
    // <div>
    //   <div>
    //     <h1>TODO</h1>
    //   </div>
    //   <article>
    //     <Link href={"/"}>Home</Link>
    //     <Link href={"/profile"}>Profile</Link>
    //     <LogoutButton />
    //   </article>
    // </div>
  );
};

export default Header;
