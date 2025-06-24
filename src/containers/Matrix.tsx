
import { useSelector } from "react-redux";
import { gameMatrixSelector } from "../store/selectors";
import styles from "../styles/matrix.module.scss";

type Props = { className?: string };

export default function Matrix({ className }: Props) {
  const matric = useSelector(gameMatrixSelector);
  return (
    <div className={`${styles.container} ${className || ''}`}>
      {matric.map((id, index) => (
        <div
          key={id}
          style={{
            "--row": Math.floor(index / 4) as number,
            "--col": (index % 4) as number,
          } as React.CSSProperties}
          data-is-empty={id === 0}
        >
          {id !== 0 &&<span>{id}</span>}
        </div>
      ))}
    </div>
  );
}
