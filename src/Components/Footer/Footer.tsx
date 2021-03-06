import { APP_NAME } from "Constants/constants";

export default function Footer() {
   return (
      <span className="relative bottom-0 left-0 right-0 mb-0 text-xs text-gray-100">
         "{APP_NAME}" isn't endorsed by Riot Games and doesn't reflect the views
         or opinions of Riot Games or anyone officially involved in producing or
         managing Riot Games properties. Riot Games, and all associated
         properties are trademarks or registered trademarks of Riot Games, Inc.
         Icons made by{" "}
         <a href="https://www.freepik.com" title="Freepik">
            Freepik
         </a>{" "}
         from{" "}
         <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
         </a>
      </span>
   );
}
