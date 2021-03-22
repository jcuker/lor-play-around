import Footer from "Components/Footer/Footer";
import Landing from "Components/Landing/Landing";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.render(
   <React.StrictMode>
      <Router basename={process.env.PUBLIC_URL}>
         <Landing />
      </Router>
      <Footer />
   </React.StrictMode>,
   document.getElementById("root")
);
