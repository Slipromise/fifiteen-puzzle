import {
  collection,
  CollectionReference,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
// type Props = {};

export default function Records() {
  // const records = doc(useFirestore(),'records')
  const firestore = useFirestore();
  const recordsCollection = collection(
    firestore,
    "records",
  ) as CollectionReference<{
    id: string;
    player: string;
    duration: number;
    time: Timestamp;
  }>;
  const recordsQuery = query(recordsCollection, orderBy("duration", "desc"));

  const { data } = useFirestoreCollectionData(recordsQuery, {
    idField: "id",
  });
  console.log(data);

  return (
    <div>
      <ul>
        {data?.map(({ id, player, duration, time }) => (
          <li
            key={id}
          >{`${player}創下${(duration / 1000).toFixed(2)}秒於${new Date(time.nanoseconds)}`}</li>
        ))}
      </ul>
    </div>
  );
}
