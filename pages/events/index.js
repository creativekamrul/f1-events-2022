import EventCard from "@/Components/events/EventCard";
import Layout from "@/Components/misc/Layout";
import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Link from "next/link";
import {BACK_API_URL} from "@/config/index";
function AllEvents({ data, pageCount, pageNumber }) {
  const localPage = pageNumber
  return (
    <Layout title={"All Events"}>
      <Row className="mt-5 mb-5">
        {data.map((event) => {
          return (
            <Col md="4" key={event.id}>
              <EventCard EventData={event}></EventCard>
            </Col>
          );
        })}
      </Row>
      <div className={""}>
        {pageNumber <= 1 ? (
          ""
        ) : (
          <button className="btn btn-primary m-4">
            <Link href={`/events?page=${localPage - 1}`}>Previous</Link>
          </button>
        )}
        {pageCount > pageNumber ? (
          <button className="btn btn-primary m-4" >
            <Link href={`/events?page=${localPage + 1}`}>next</Link>
          </button>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ query: { page = 1 } }) {
  const PER_PAGE = 3;
  const res = await fetch(
    `${BACK_API_URL}/api/events?populate=%2A&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      data: data.data,
      pageCount: data.meta.pagination.pageCount,
      pageNumber: data.meta.pagination.page,
    },
  };
}

export default AllEvents;
