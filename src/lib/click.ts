import { doc, getDoc, setDoc, updateDoc, increment, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function recordClick(x: number, y: number) {
  const id = `${x}_${y}`;
  const ref = doc(db, 'clicks', id);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    await updateDoc(ref, { count: increment(1) });
  } else {
    await setDoc(ref, { x, y, count: 1 });
  }

  const updatedSnap = await getDoc(ref);
  const clickCount = updatedSnap.data()?.count ?? 1;

  // 全体のクリック数を集計
  const all = await getDocs(collection(db, 'clicks'));
  let totalClicks = 0;
  all.forEach((doc) => {
    totalClicks += doc.data().count ?? 0;
  });

  const percentage = ((clickCount / totalClicks) * 100).toFixed(2);

  return {
    clickCount,
    totalClicks,
    percentage
  };
}