import React, {useContext, useEffect} from "react";
import Layout from "@/Components/misc/Layout";
import { Col, Row, Container } from "react-bootstrap";
import EventCard from "@/Components/events/EventCard";
import AuthContext from "@/context/AuthContext";



function Dashboard() {
    const { userPosts, error, getUserPosts, loading } = useContext(AuthContext);

    useEffect(() => error && toast.error(error))
    useEffect(() => {
        getUserPosts()
    }, [])
if(!loading){
    if(userPosts.length !== 0){
        return (
            <Layout title={"Dashboard"}>
              <div>
                <h1>Here are all your events</h1>
                <Row className="mt-5 mb-5">
                  {userPosts.map((event) => {
                    return (
                      <Col md="4" key={event.id}>
                        <EventCard EventData={event}></EventCard>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Layout>
          );
     }else{
        return (
            <Layout title={"Dashboard"}>
              <div>
                <h1>Here are all your events</h1>
                <Row className="mt-5 mb-5">
                    <Col md="4">
                        <h2>No Events Found</h2>
                    </Col>
                </Row>
              </div>
            </Layout>
          );
     }
}else{
    return (
        <Layout title={"Dashboard"}>
          <div>
            <h1>Loading</h1>

          </div>
        </Layout>
      );
}
        }
export default Dashboard;

