import { createContext, useState, useEffect } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
const AuthContext = createContext();
import { FRONT_API_URL, BACK_API_URL } from "@/config/index";
export const AuthProvider = ({ children }) => {
  useEffect(() => CheckUserLogin(), []);


  const [user, setUser] = useState(null);
  useEffect(() => getUserPosts(), [user]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const deleteEvent = async (eventData) => {
    const res = await fetch(
      `${BACK_API_URL}/api/events/${eventData.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      toast.error("Something went wronge");
    } else {
      Router.push("/User/Dashboard");
    }
  };
  const sendUserToDashboard = () => {
    Router.push("/User/Dashboard");
  }
  const userLogin = async ({ email: identifier, password }) => {
    const res = await fetch(`${FRONT_API_URL}/api/login`, {
      method: "POST",
      headers: {
        
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();

    if (res.status === 200) {
      setUser(data.user);
      sendUserToDashboard();
    } else {
      setError(data.message.message);
      setError(null);
    }
  };

  const userRegistar = async ({ email, username, password }) => {
    const res = await fetch(`${FRONT_API_URL}/api/registar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });
    const data = await res.json();

    if (res.status === 200) {
      setUser(data.user);
      Router.push("/User/Dashboard");
    } else {
      setError(data.message.message);
      setError(null);
    }
  };
  const userLogout = async () => {
    const res = await fetch(`${FRONT_API_URL}/api/logout`, {
      method: "POST",
    });
    if (res.ok) {
      setUser(null);
      Router.push("/");
    }
  };
  const CheckUserLogin = async (user) => {
    const res = await fetch(`${FRONT_API_URL}/api/user`);
    const data = await res.json();

    if (res.status === 200) {
      setUser(data.user);
      setJwtToken(data.jwt);
    } else {
      setUser(null);
    }
  };
  const getUserPosts = async () => {
    const res = await fetch(
      `${BACK_API_URL}/api/events?populate=%2A`
    );
    const data = await res.json();
    const TempUserPosts = [];

    if (res.status === 200) {
      data.data.map(e => {
        if(user){

          if(e.attributes.user.data.id === user.id){
            TempUserPosts.push(e)
          }
        }
      })
      setUserPosts(TempUserPosts);
      setLoading(false);
    } else {
      setError(data.message.message);
      setError(null);
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        userPosts,
        jwtToken,
        user,
        error,
        loading,
        userLogin,
        userRegistar,
        userLogout,
        CheckUserLogin,
        getUserPosts,
        deleteEvent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
