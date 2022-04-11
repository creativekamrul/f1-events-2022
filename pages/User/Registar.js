import React, { useState, useContext, useEffect } from "react";
import Layout from "@/Components/misc/Layout";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function RegistarPage() {
  const { userRegistar, error } = useContext(AuthContext);
  useEffect(() => error && toast.error(error))
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 const handleSubmit = (e) => {
    e.preventDefault();
    if(email === "" || username === "" || password === "" || confirmPassword === ""){
      toast.error("Please fill all the fields");
    }else if(password !== confirmPassword){
      toast.error("Password does not match");
    }else{
      userRegistar({email, username, password});
    }
  }
 
  return (
    <Layout title={"Registar"}>
      <ToastContainer />
      <Row className="justify-content-center">
        <Col md={4}>
          <div>
            <h1 className="text-center ">Registar</h1>
            <form onSubmit={handleSubmit}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control m-4"
                type="email"
                placeholder="Email"
              />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control m-4"
                type="text"
                placeholder="Username"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control m-4"
                type="password"
                placeholder="Password"
              />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control m-4"
                type="password"
                placeholder="Confirm Password"
              />
              <input
                className="form-control m-4 bg-primary text-light b-0"
                type="submit"
                value="Registar"
              />
            </form>
          </div>
          <p className="text-center">
            Have an account? <Link href={"/User/Login"}>Login Here</Link>
          </p>
        </Col>
      </Row>
    </Layout>
  );

  }
export default RegistarPage;
