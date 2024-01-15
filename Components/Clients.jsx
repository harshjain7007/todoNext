"use client";

import { useState, createContext, useContext, useEffect } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutButton = () => {
  const { user, setUser } = useContext(Context);

  const logoutHandler = async () => {
    // alert("logged out");
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (!data.success) return toast.error(data.message);

      setUser({});
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <>
      {user._id ? (
        <button
          onClick={logoutHandler} className="btn" 
        >
          Log Out
        </button>
      ) : (
        <Link href={"/login"}>Login</Link>
      )}
    </>
  );
};

export const TodoButton = ({ id, completed }) => {
  const router = useRouter();



  const deleteDandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };


  const updateDandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => updateDandler(id)}
      />
      <button className="btn" onClick={() => deleteDandler(id)}>
        Delete
      </button>
    </>
    // <>
    //   <input type="checkbox" checked={completed} onChange={() => updateDandler(id)} />
    //   <button className="btn" onClick={() => deleteDandler(id)}>
    //     Delete
    //   </button>
    // </>
  );
};
