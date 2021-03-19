import { useState } from "react";
import hMenu from "@images/hMenu.svg";

interface Props {
   content: JSX.Element;
}

export default function SlideMenu({ content }: Props) {
   const [expanded, setExpanded] = useState(false);

   const toggle = (
      <img
         alt="menu toggle"
         src={hMenu}
         style={{
            filter: "invert(100%)",
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 225ms ease",
         }}
      />
   );

   return (
      <>
         <button
            className="absolute top-3 right-3"
            style={{
               maxHeight: "4rem",
               maxWidth: "4rem",
               height: "5.5vw",
               width: "5.5vw",
               minHeight: "2rem",
               minWidth: "2rem",
            }}
            onClick={() => setExpanded(!expanded)}
         >
            {toggle}
         </button>

         <div
            className="z-50 navbar w-64 absolute bg-gray-700 top-0 h-screen flex flex-col flex-wrap"
            style={{
               transform: expanded ? "translateX(0%)" : "translateX(-100%)",
               transition: "transform 175ms ease",
            }}
         >
            {content}
         </div>
      </>
   );
}
