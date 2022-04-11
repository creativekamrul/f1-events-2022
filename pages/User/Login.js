import React, { useContext, useState, useEffect } from "react";
import Layout from "@/Components/misc/Layout";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginPage() {

  const { userLogin, error } = useContext(AuthContext);
  useEffect(() => error && toast.error(error))
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === "" || password === ""){
      toast.error("Please fill all the fields");
    }else{
      userLogin({email, password});
    }
  };
  
  return (
    <Layout title={"Login"}>
      <ToastContainer />
      <Row className="justify-content-center">
        <Col md={4}>
          <div>
            <h1 className="text-center ">Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control m-4"
                type="email"
                placeholder="Emails"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control m-4"
                type="password"
                placeholder="Password"
              />
              <input
                className="form-control m-4 bg-primary text-light b-0"
                type="submit"
                value="Login"
              />
            </form>
            <p className="text-center">
              Don't have a account?{" "}
              <Link href={"/User/Registar"}>Registar Here</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default LoginPage;
