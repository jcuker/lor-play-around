import { MANA_VALUES } from "../../../Constants/constants";

interface Props {
   onManaClick: (val: number) => void;
}

export default function ManaPicker({ onManaClick }: Props) {
   return (
      <div
         className="flex flex-row justify-around flex-wrap"
         style={{ flex: 1 }}
      >
         {Object.keys(MANA_VALUES).map((key: string) => (
            <div
               className="flex text-white justify-center items-center"
               style={{
                  backgroundImage:
                     "linear-gradient(319deg, rgb(0, 212, 255) 15%, rgb(2, 0, 36) 31%, rgb(2, 0, 36) 69%, rgb(0, 212, 255) 75%)",
                  borderRadius: "50%",
                  height: "4vw",
                  minHeight: 27,
                  maxHeight: 48,
                  width: "4vw",
                  minWidth: 27,
                  maxWidth: 48,
                  border: "1px solid rgb(189, 158, 89)",
                  boxShadow:
                     "rgba(20, 11, 36, 0.8) 0px 0px 6px 0px, black 0px 0px 0px 2px inset",
               }}
               onClick={() => {
                  onManaClick(MANA_VALUES[key]);
               }}
            >
               {MANA_VALUES[key]}
            </div>
         ))}
      </div>
   );
}
