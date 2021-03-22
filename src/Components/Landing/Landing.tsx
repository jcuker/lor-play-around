import PlayAround from "Components/PlayAround/PlayAround";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DefaultContent from "./DefaultContent";

function Landing() {
   const [toRender, setToRender] = useState<JSX.Element>(<></>);

   const location = useLocation();

   useEffect(() => {
      if (location.search.length > 0) {
         setToRender(<PlayAround />);
      } else {
         setToRender(<DefaultContent />);
      }
   }, [location]);

   return toRender;
}

export default Landing;
