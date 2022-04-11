import Layout from "@/Components/misc/Layout";
import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "@/context/AuthContext";
import { BACK_API_URL } from "@/config/index";
function EditEvent({ eventData }) {
  const [idFound, setIdFound] = useState(false);
  const { userPosts, error, jwtToken, loading, deleteEvent} = useContext(AuthContext);
  useEffect(() => error && toast.error(error));
  useEffect(() => { EventAuth() }, []);

  const { Title, EventDateTime, EventDes, EventPlace } = eventData.attributes;
  const [formValues, setFormValues] = useState({
    Title: Title,

    EventDateTime: EventDateTime,
    EventPlace: EventPlace,
    EventDes: EventDes,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFeilds = Object.values(formValues).some((e) => e === "");
    if (emptyFeilds) {
      toast.error("Yo fill up all the fields");
    }
    if (!emptyFeilds) {
      const dataBody = {
        data: {
          Title: formValues.Title,
          EventDateTime: formValues.EventDateTime,
          EventPlace: formValues.EventPlace,
          EventDes: formValues.EventDes,
        },
      };

      const res = await fetch(
        `${BACK_API_URL}/api/events/${eventData.id}?populate=*`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataBody),
        }
      );
      if (res.ok) {
        toast("Event Updated", { type: "success" });
      } else {
        toast.error("Something went wronge");
      }
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

const EventAuth = async () => {
  if (userPosts && !loading) {
    if (userPosts.some((e) => e.id === eventData.id)) {
      setIdFound(true);

    }
  } 
  
}
  if(!loading && idFound){
    return (
      <Layout title={"Update an Event"} isFluid={false}>
        <div>
         <div className="d-flex justify-content-between mt-5 mb-5 align-items-center">
         <h1 className="pt-4 text-left">Update Event</h1>
          <button onClick={()=> deleteEvent(eventData)} style={{height: "40px"}} className="btn btn-small btn-danger me-2">
            Delete
          </button>
         </div>
          <ToastContainer />
          <form method="POST" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="Title"
                placeholder="Add Your Title"
                value={formValues.Title}
                onChange={handleInput}
                className="form-control mb-2"
              />
            </div>
            <div>
              <input
                type="text"
                name="EventDateTime"
                placeholder="Add Event Date"
                value={formValues.EventDateTime}
                onChange={handleInput}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="EventPlace"
                placeholder="Add Event Place"
                value={formValues.EventPlace}
                onChange={handleInput}
                className="form-control mb-2"
              />
            </div>
            <div>
              <textarea
                cols="30"
                rows="10"
                name="EventDes"
                placeholder="Add Your Event Description"
                value={formValues.EventDes}
                onChange={handleInput}
                className="form-control mb-2"
              ></textarea>
              <button type="sumbit" className="btn-primary form-control mb-2 mt-3">
                Update Event
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }else if(loading){
    return (
      <Layout title={"Update an Event"} isFluid={false}>
        <div>
          <h1 className="pt-4 text-center">Loading</h1>
          <ToastContainer />
         
        </div>
      </Layout>
    );
  }else{
    return (
      <Layout title={"Update an Event"} isFluid={false}>
        <div>
          <h1 className="pt-4 text-center">Not Autherized</h1>
          <ToastContainer />
         
        </div>
      </Layout>
    );
  }
}
export async function getServerSideProps({ query: { EventID } }) {
  const res = await fetch(
    `${BACK_API_URL}/api/events/${EventID}?populate=%2A`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { eventData: data.data } };
}

export default EditEvent;
