import React, { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import styles from "@/Styles/Layout.module.css";
import { Row, Col } from "react-bootstrap";
const Header = () => {
  const { user, userLogout } = useContext(AuthContext);

  return (
    <div className={styles.Header}>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Row className="justify-content-between" style={{ width: "100%" }}>
            <Col md="6">
              <Navbar.Brand className="logo">
                {" "}
                <Link href="/">F1 Events</Link>
              </Navbar.Brand>
            </Col>
            <Col md="6 text-end menu-links">
              <Link href="/events">All Events</Link>
              {user ? (
                <>
                 <Link href="/Addevent">Add Event</Link>
                 <Link href="/User/Dashboard">Dashboard</Link>
                  <button className="btn btn-light" onClick={userLogout}>
                    
                      Logout

                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-light">
                    <Link className={"anchorTag"} href="/User/Login">
                      Login
                    </Link>
                  </button>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
