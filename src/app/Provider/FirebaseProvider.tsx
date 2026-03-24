'use client';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const FirebaseContext = React.createContext();

type Todo = {
  name: string;
  isComplete: boolean;
  id: string;
  priority: number;
};

export const FirebaseProvider = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    setloading(true);
    const unsubscibe = onSnapshot(collection(db, 'todo'), (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
      setloading(false);
    });
    return () => unsubscibe();
  }, []);
  console.log(todos);
  const addTodo = async ({ name, priority, repeat }) => {
    await addDoc(collection(db, 'todo'), {
      name: name,
      isComplete: false,
      priority: priority || '',
      repeat: repeat || '',
    });
  };
  const deleteTodo = async (id: number) => {
    await deleteDoc(doc(db, 'todo', id));
  };
  return (
    <FirebaseContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error('useFirebase must be used within FirebaseProvider');
  return context;
};
