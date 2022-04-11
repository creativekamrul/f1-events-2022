import Layout from "@/Components/misc/Layout";
import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "@/context/AuthContext";
import {BACK_API_URL} from "@/config/index";
const addEvent = () => {
  const {error, jwtToken, user } = useContext(AuthContext);
  useEffect(() => error && toast.error(error))
  const [formValues, setFormValues] = useState({
    Title: "",

    EventDateTime: "",
    EventPlace: "",
    EventDes: "",
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
          user: user,
        },
      };

      const res = await fetch(`${BACK_API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });
      if (res.ok) {
        toast("Event Added", { type: "success" });
      } else {
        toast.error("Something went wronge");
      }
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Layout title={"Add an Event"} isFluid={false}>
      <div>
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
          {/* <input
            type="file"
            name="FeaturedImage"
            value={formValues.FeaturedImage}
            onChange={handleInput}
          /> */}
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
          <button className="btn-primary form-control mb-2" type="sumbit">Add Event</button>
        </div>
      </form>
    </div>
    </Layout>
  );
}

export default addEvent;
