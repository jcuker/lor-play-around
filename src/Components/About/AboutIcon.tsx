import { useHistory } from "react-router-dom";

export default function AboutIcon() {
   const history = useHistory();

   function navigate() {
      history.push(`/about`);
   }

   return window.location.pathname.includes("about") ? (
      <></>
   ) : (
      <div
         className="absolute top-0 right-0 m-4 text-gray-100 flex justify-center items-center text-lg"
         style={{
            border: "3px solid white",
            borderRadius: "50%",
            padding: 8,
            height: 62,
            width: 62,
            fontSize: 32,
         }}
         aria-label="Navigate to About Page"
         role="button"
         onClick={() => navigate()}
      >
         ?
      </div>
   );
}
