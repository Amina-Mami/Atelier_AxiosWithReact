import React, { Suspense, useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import UpdateEvent from "./components/UpdateEvent"; // Import UpdateEvent component
const Header = React.lazy(() => import("./components/Header"));
const Products = React.lazy(() => import("./components/Products"));
const Events = React.lazy(() => import("./components/Events"));
const EventDetails = React.lazy(() => import("./components/EventDetails"));
const FormEvent = React.lazy(() => import("./components/FormEvent"));

function App() {
  const [show, setShow] = useState(true);
  const [role, setRole] = useState("admin");

  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Header />
        <Routes>
          <Route path="/events">
            <Route index element={<Events />} />
            <Route path=":id/:title" element={<EventDetails />} />
            <Route path="add" element={<FormEvent />} />
            <Route path="update-event/:id" element={<UpdateEvent />} /> {/* */}
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="*" element={<h1>Not Found</h1>} /> {/*  */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
