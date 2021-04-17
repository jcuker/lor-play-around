import { MANA_VALUES } from 'Constants/constants';

interface Props {
   val: string;
   selected?: boolean;
   onClick?: (val: number) => any;
}
export default function ManaGem({ val, selected = false, onClick }: Props) {
   return (
      <div
         className={`flex text-white justify-center items-center opacity-${
            selected ? 100 : 50
         } hover:opacity-100`}
         style={{
            backgroundImage:
               'linear-gradient(319deg, rgb(0, 212, 255) 15%, rgb(2, 0, 36) 31%, rgb(2, 0, 36) 69%, rgb(0, 212, 255) 75%)',
            borderRadius: '50%',
            height: '4vw',
            minHeight: 30,
            maxHeight: 64,
            width: '4vw',
            minWidth: 30,
            maxWidth: 64,
            border: '1px solid rgb(189, 158, 89)',
            boxShadow:
               'rgba(20, 11, 36, 0.8) 0px 0px 6px 0px, black 0px 0px 0px 2px inset',
         }}
         onClick={() => {
            onClick?.(MANA_VALUES[val]);
         }}
         key={val}
      >
         {val}
      </div>
   );
}
