'use client';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import Todos from '../components/Todos';
import { useFirebase } from '../Provider/FirebaseProvider';
import clsx from 'clsx';
import { Flag, RefreshCw, Plus, X } from 'lucide-react';
import { useCheckDaysToEnd } from '../AppContext';
import AddTodo from '../components/AddTodo';

const TodoList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [priority, setPriority] = useState<number>(1);
  const [repeat, setRepeat] = useState(0);
  const [prioVis, setPrioVis] = useState(false);
  const [repVis, setRepVis] = useState(false);
  const [addTodoVis, setAddTodoVis] = useState(false);
  const { addTodo } = useFirebase();
  const allData = useCheckDaysToEnd();

  const prioRef = useRef<HTMLDivElement>(null);
  const repRef = useRef<HTMLDivElement>(null);

  const priorityLabels = ['High', 'Medium', 'Low'];
  const repeatLabels = ['None', 'Daily', '2 Days', '3 Days'];
  return (
    <div className={clsx('relative min-h-screen bg-[#0a0c10] flex justify-center p-4')}>
      <div className={clsx('max-w-lg w-full relative')}>
        <div
          className={clsx(
            ' bg-[#0c121c]/75 border p-8 ',
            ' rounded-3xl shadow-[0_0_10px_rgba(59,130,246,0.25)] border-blue-400/20'
          )}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl text-balance text-[#eef5ff] font-bold">My Tasks</h1>
          </div>
          <div className={clsx('flex items-center justify-center w-full')}>
            <h1
              onClick={() => setAddTodoVis(true)}
              className="text-center bg-blue-500 p-2 rounded-sm"
            >
              Add todo
            </h1>
          </div>
          {addTodoVis && (
            <>
              <div
                className={clsx('fixed z-40 bg-black/40 inset-0 flex items-center justify-center')}
                onClick={() => setAddTodoVis(false)}
              />
              <div
                className={clsx(
                  'fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                  'w-[95vw] max-w-md bg-[#181f2a] border border-blue-400/30 rounded-2xl p-6 shadow-2xl flex flex-col'
                )}
              >
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setAddTodoVis(false)}
                    className="p-1 rounded hover:bg-blue-500/10 transition"
                  >
                    <X className="w-5 h-5 text-blue-300" />
                  </button>
                </div>
                <AddTodo />
              </div>
            </>
          )}
          <div
            className={clsx(
              'mt-5 bg-gradient-to-r from-transparent via-blue-800 to-transparent w-full h-px'
            )}
          />
          <Todos />
        </div>
      </div>
    </div>
  );
};
export default TodoList;
