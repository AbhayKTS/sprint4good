import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const usersRef = collection(db, 'users');
const ideasRef = collection(db, 'ideas');
const feedbackRef = collection(db, 'feedback');

export const ensureUserDocument = async (user) => {
  if (!user) return;
  const q = query(usersRef, where('uid', '==', user.uid));
  const existing = await getDocs(q);
  if (existing.empty) {
    await addDoc(usersRef, {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Friend',
      email: user.email,
      createdAt: serverTimestamp(),
    });
  }
};

export const saveIdeaDocument = async ({ userId, inputs, generatedIdeas, businessPlan }) => {
  return addDoc(ideasRef, {
    userId,
    inputs,
    generatedIdeas,
    businessPlan,
    createdAt: serverTimestamp(),
  });
};

export const listIdeas = async (userId) => {
  const q = query(ideasRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const deleteIdea = async (id) => deleteDoc(doc(db, 'ideas', id));

export const submitFeedback = async ({ ideaId, rating }) =>
  addDoc(feedbackRef, { ideaId, rating, createdAt: serverTimestamp() });
