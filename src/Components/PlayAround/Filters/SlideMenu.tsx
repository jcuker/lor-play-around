import { useState } from "react";
import hMenu from "@images/hMenu.svg";

interface Props {
   content: JSX.Element;
}

export default function SlideMenu({ content }: Props) {
   const [expanded, setExpanded] = useState(false);
   const menuWidth = 35;
   const animationTime = 333;

   const toggle = (
      <img
         alt="menu toggle"
         src={hMenu}
         style={{
            filter: "invert(100%)",
         }}
      />
   );

   return (
      <>
         <button
            className="fixed top-3 right-3"
            style={{
               maxHeight: "4rem",
               maxWidth: "4rem",
               height: "5.5vw",
               width: "5.5vw",
               minHeight: "2rem",
               minWidth: "2rem",
               right: `${menuWidth + 2}vw`,
               transform: !expanded
                  ? `translateX(${menuWidth + 1}vw)`
                  : "translateX(25%)",
               transition: `transform ${animationTime}ms cubic-bezier(.19,1,.12,1.06)`,
            }}
            onClick={() => setExpanded(!expanded)}
         >
            {toggle}
         </button>

         <div
            className="z-50 w-64 fixed bg-gray-700 top-0 right-0 h-screen flex flex-col flex-wrap"
            style={{
               transform: expanded ? "translateX(0%)" : "translateX(100%)",
               transition: `transform ${animationTime}ms ease`,
               maxWidth: `${menuWidth}vw`,
               width: `${menuWidth}vw`,
            }}
         >
            {content}
         </div>
      </>
   );
}
