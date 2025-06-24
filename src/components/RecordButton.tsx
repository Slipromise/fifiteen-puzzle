import { FaHistory } from "react-icons/fa";


type Props = {
  onClick?: () => void;
  className?: string;
};

export default function RecordButton({ onClick, className }: Props) {
  return (
    <div onClick={onClick} className={`${className}`}>
      <FaHistory></FaHistory>
    </div>
  );
}
