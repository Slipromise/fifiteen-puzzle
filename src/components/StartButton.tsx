
type Props = {
  className?: string;
  onClick?: () => void;
  isRestart?: boolean;
};

export default function StartButton({ className, onClick }: Props) {
  return (
    <button className={className} onClick={onClick}>
      Start
    </button>
  );
}
