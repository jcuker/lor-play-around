import Footer from "Components/Footer/Footer";
import Landing from "Components/Landing/Landing";
import PlayAround from "Components/PlayAround/PlayAround";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

ReactDOM.render(
   <React.StrictMode>
      <Router basename={process.env.PUBLIC_URL}>
         <Switch>
            <Route path="/around/:regions">
               <PlayAround />
            </Route>
            <Route path="/">
               <Landing />
            </Route>
         </Switch>
      </Router>
      <Footer />
   </React.StrictMode>,
   document.getElementById("root")
);
