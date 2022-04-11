import React from "react";
import Layout from "@/Components/misc/Layout";
import { Col, Row, Container } from "react-bootstrap";
import EventCard from "@/Components/events/EventCard";
import { BACK_API_URL } from "@/config/index";
function Home({ data }) {

  return (
    <Layout title={"F1 Events"}>
      <div>
        <h1>Welcome to F1 Events</h1>
        <Row className="mt-5 mb-5">
          {data.map((event) => {
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
}
export async function getServerSideProps() {
  const res = await fetch(`${BACK_API_URL}/api/events?populate=%2A&pagination[pageSize]=${4}`);
  const data = await res.json();
  console.log(data)
  // Pass data to the page via props
  return { props: { data: data.data } };
}
export default Home;

// Add their events
// delete events
// more stuff
// JWT auth
// Home - All Events - Single - Login/Signup - Users Page
