'use client';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

const FirebaseContext = React.createContext();

type DailyTask = {
  name: string;
  isComplete: boolean;
  id: string;
};

type Todo = {
  name: string;
  isComplete: boolean;
  id: string;
  priority: { value: number; allData: any };
};
const theDay = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
export const FirebaseProvider = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const addDailyTask = async ({ name, comment, percent }) => {
    await addDoc(collection(db, 'dailyTasks'), {
      name: name,
      comment: comment,
      percent: percent,
      isComplete: false,
      date: theDay,
    });
  };

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
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'dailyTasks'), (snapshot) => {
      const dailyTasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDailyTasks(dailyTasksData);
    });
    return () => unsubscribe();
  }, []);

  const editeDailyTask = async (id: string, name: string, comment: string, percent: number) => {
    try {
      const docRef = doc(db, 'dailyTasks', id);
      await updateDoc(docRef, { name, comment, percent });
    } catch (e) {
      console.log(e);
    }
  };

  const upadteName = async () => {
    try {
      const todosRef = collection(db, 'todo');
      const querySnapshot = await getDocs(todosRef);

      querySnapshot.forEach(async (document) => {
        const currentData = document.data();

        if (
          currentData.isComplete &&
          currentData.repeat[0] !== 0 &&
          currentData.repeat[1] !== theDay &&
          currentData.repeat[1] + currentData.repeat[0] <= theDay
        ) {
          const newData = {
            ...currentData,
            name: currentData.name.toUpperCase(),
            repeat: [currentData.repeat[0], theDay],
            isComplete: false,
          };
          const docRef = doc(db, 'todo', document.id);
          await updateDoc(docRef, newData);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    upadteName();
  }, []);
  const addTodo = async ({ name, priority, repeat }) => {
    await addDoc(collection(db, 'todo'), {
      name: name,
      isComplete: false,
      priority: priority || priority,
      repeat: [repeat, theDay],
    });
  };
  const deleteDailyTask = async (id: string) => {
    await deleteDoc(doc(db, 'dailyTasks', id));
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
    <FirebaseContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        loading,
        toggleComplete,
        addDailyTask,
        dailyTasks,
        deleteDailyTask,
        editeDailyTask,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error('useFirebase must be used within FirebaseProvider');
  return context;
};
