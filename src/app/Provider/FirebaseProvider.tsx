'use client';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const FirebaseContext = React.createContext();

type Todo = {
  name: string;
  isComplete: boolean;
  id: string;
  priority: { value: number; allData: any };
};

export const FirebaseProvider = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    setloading(true);
    const unsubscribe = onSnapshot(collection(db, 'todo'), (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
      setloading(false);
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, 'todo'), (snapshot) => {
  //     const todosData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //   });
  //   return () => unsubscribe();
  // }, []);
  const addTodo = async ({ name, priority, repeat }) => {
    await addDoc(collection(db, 'todo'), {
      name: name,
      isComplete: false,
      priority: priority || priority,
      repeat: repeat || repeat,
    });
  };
  const deleteTodo = async (id: number) => {
    await deleteDoc(doc(db, 'todo', id));
  };
  const toggleComplete = async (id: number, currentStatus: boolean) => {
    const todoRef = doc(db, 'todo', id);
    await updateDoc(todoRef, {
      isComplete: !currentStatus,
    });
  };
  return (
    <FirebaseContext.Provider value={{ todos, addTodo, deleteTodo, loading, toggleComplete }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error('useFirebase must be used within FirebaseProvider');
  return context;
};
