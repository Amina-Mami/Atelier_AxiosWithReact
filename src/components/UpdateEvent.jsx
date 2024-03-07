import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, editEvent } from "../services/eventServices";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UpdateEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(id);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      nbTickets: 0,
      img: "",
      nbParticipants: 0,
      like: false,
    },
    onSubmit: async (values) => {
      try {
        await editEvent(id, values);
        alert("Event successfully updated");
        navigate("/events");
      } catch (error) {
        console.error("Error updating event:", error);
      }
    },
  });

  useEffect(() => {
    if (event) {
      formik.setValues(event);
    }
  }, [event]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Event</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            type="number"
            name="nbTickets"
            value={formik.values.nbTickets}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            name="img"
            value={formik.values.img}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Event
        </Button>
      </Form>
    </div>
  );
}

export default UpdateEvent;
