import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import hMenu from "@images/hMenu.svg";
import { isOnMobile, isSmallScreen } from "Helpers/helpers";

interface Props {
   content: JSX.Element;
}

export default function SlideMenu({ content }: Props) {
   const [expanded, setExpanded] = useState(false);
   const [menuWidth, setMenuWidth] = useState(0);
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

   const calcMenuWidth = useCallback(
      () => setMenuWidth(isOnMobile() || isSmallScreen() ? 60 : 35),
      [setMenuWidth]
   );

   useEffect(() => {
      calcMenuWidth();
   }, [calcMenuWidth]);

   useLayoutEffect(() => {
      window.addEventListener("resize", calcMenuWidth);
      calcMenuWidth();
      return () => window.removeEventListener("resize", calcMenuWidth);
   }, [calcMenuWidth]);

   const toggleExpanded = useCallback(
      (to?: boolean) => {
         function eventListener(event: KeyboardEvent) {
            return event.code === "Escape" ? toggleExpanded(false) : undefined;
         }
         const isExpanded = to !== undefined ? to : !expanded;

         isExpanded
            ? document.addEventListener("keydown", eventListener)
            : document.removeEventListener("keydown", eventListener);

         setExpanded(isExpanded);
      },
      [expanded]
   );

   // useEffect(() => {
   //    toggleExpanded(!isOnMobile());
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, []);

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
               zIndex: 999,
               minWidth: "2rem",
               right: `${menuWidth + 2.5}vw`,
               transform: !expanded
                  ? `translateX(${menuWidth + 1}vw)`
                  : "translateX(25%)",
               transition: `transform ${animationTime}ms ease`,
               willChange: "transform",
            }}
            onClick={() => toggleExpanded()}
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
               willChange: "transform",
            }}
         >
            {content}
         </div>
         <div
            className={`top-0 left-0 fixed h-screen ${
               !expanded ? "hidden" : ""
            } opacity-50`}
            style={{
               maxWidth: "100%",
               backgroundColor: "black",
               width: "100vw",
            }}
            onClick={() => toggleExpanded(false)}
         ></div>
      </>
   );
}
