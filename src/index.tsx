import Footer from "Components/Footer/Footer";
import Landing from "Components/Landing/Landing";
import MetaDecks from "Components/MetaDecks/MetaDecks";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";

ReactDOM.render(
   <React.StrictMode>
      <Router basename={process.env.PUBLIC_URL}>
         <Switch>
            <Route path="/meta">
               <MetaDecks />
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
