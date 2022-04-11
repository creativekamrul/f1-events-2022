import Link from "next/link";
import React from "react";
import { Card, Button } from "react-bootstrap";
const EventCard = ({ EventData }) => {
  const { Title, EventDateTime, EventDes, EventPlace, FeaturedImage } =
    EventData.attributes;
  return (
    <div className="EventCard">
      <Card className="m-4">
        <Card.Body>
          <Card.Title>{Title}</Card.Title>
          <Card.Text>{EventDes}</Card.Text>
          <Button variant="primary">
            <Link href={`/events/${EventData.id}`}>Read More</Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventCard;
