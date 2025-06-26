import { useSelector } from "react-redux";
import { gameMatrixSelector } from "../store/selectors";
import styles from "../styles/matrix.module.scss";

type Props = { className?: string };

export default function Matrix({ className }: Props) {
  const matric = useSelector(gameMatrixSelector);
  return (
    <div className={`${styles.container} ${className || ""}`}>
      {matric
        .map((id, index) => ({
          id,
          row: Math.floor(index / 4),
          col: index % 4,
        }))
        .sort((a, b) => a.id - b.id)
        .map(({ id, row, col }) =>
          id !== 0 ? (
            <div
              key={id}
              style={
                {
                  "--row": row,
                  "--col": col,
                } as React.CSSProperties
              }
              data-is-empty={id === 0}
            >
              <span>{id}</span>
            </div>
          ) : undefined,
        )}
    </div>
  );
}
