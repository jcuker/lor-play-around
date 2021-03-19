interface Props {
   content: JSX.Element;
   heading: string;
}

function Divider() {
   return <></>;
}

export default function FilterSection({ content, heading }: Props) {
   return (
      <>
         <span className="text-gray-100">{heading}</span>
         <div className="flex flex-row">{content}</div>
         <Divider />
      </>
   );
}
