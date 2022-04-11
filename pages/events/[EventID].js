import Layout from "@/Components/misc/Layout";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { BACK_API_URL } from "@/config/index";
function SingleEvent({ eventData }) {
  const { Title, EventDateTime, EventDes, EventPlace } = eventData.attributes;
  const router = useRouter();

  return (
    <Layout title={Title} isFluid={false}>
      <Row className="mt-5 mb-5">
        <Col md={11}>
          <h1>{Title}</h1>
        </Col>
        <Col>
          <button className="btn btn-small btn-warning">
            <Link href={`/update-event/${eventData.id}`}>Edit</Link>
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h5>Event Date : {EventDateTime}</h5>
            <h5>Event Address : {EventPlace}</h5>
          </div>
          <p className="mt-5">{EventDes}</p>
        </Col>
      </Row>
    </Layout>
  );
}
export async function getServerSideProps({ query: { EventID } }) {
  const res = await fetch(`${BACK_API_URL}/api/events/${EventID}?populate=%2A`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { eventData: data.data } };
}

export default SingleEvent;
