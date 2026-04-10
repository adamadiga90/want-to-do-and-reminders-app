'use client';
import React, { useEffect, useState } from 'react';

import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useFirebase } from '../Provider/FirebaseProvider';
import { Trash2, Flag, RefreshCw, CheckCircle2, Circle, Key } from 'lucide-react';
import clsx from 'clsx';

const Todos = () => {
  const { todos, deleteTodo, loading, toggleComplete } = useFirebase();

  const grouped = {
    High: todos.filter((todo) => todo.priority === 1 && !todo.isComplete),
    Medium: todos.filter((todo) => todo.priority === 2 && !todo.isComplete),
    Low: todos.filter((todo) => todo.priority === 3 && !todo.isComplete),
    Complete: todos.filter((todo) => todo.isComplete),
  };

  const sections = [
    {
      key: 'High',
      divederClass: 'bg-red-500',
      todo: grouped.High,
    },
    {
      key: 'Medium',
      divederClass: 'bg-gradient-to-b from-red-500 to-amber-500',
      todo: grouped.Medium,
    },
    {
      key: 'Low',
      divederClass: 'bg-gradient-to-b from-amber-500 to-emerald-500',
      todo: grouped.Low,
    },
    {
      key: 'Complete',
      divederClass: 'bg-gray-500',
      todo: grouped.Complete,
    },
  ];

  const TodoItem = ({ todo, onToggle, onDelete }) => {
    const priorityConfig = {
      1: { label: 'High', color: 'text-red-400', bg: 'bg-red-500/10' },
      2: {
        label: 'Medium',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
      },
      3: {
        label: 'Low',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
      },
    };
    const repeatLabels = ['', 'Daily', '2/Days', '3/Days'];
    const priority = priorityConfig[todo.priority] || priorityConfig[3];
    return (
      <li
        key={todo.id}
        className={clsx(
          'group border hover:border-blue-400/40 transition duration-200',
          'bg-[#141c28]/60 border p-4 rounded-2xl flex',
          'items-center justify-between border-blue-400/10'
        )}
      >
        <div className={clsx('flex items-center gap-4')}>
          <button
            className={clsx(' cursor-pointer')}
            onClick={() => toggleComplete(todo.id, todo.isComplete)}
          >
            <div
              className={clsx(
                { 'bg-amber-50': todo.isComplete },
                ' w-5 h-5 scale-50 absolute rounded-full  transition-colors'
              )}
            />
            <Circle
              className={clsx(
                'w-5 h-5 text-[#6c86a3]  group-hover:text-blue-400 transition-colors'
              )}
            />
          </button>
          <div className="flex flex-col text-sm">
            <p className="text-white">{todo.name}</p>
            <div className={clsx('flex gap-2')}>
              <span
                className={clsx(
                  priority.bg,
                  priority.color,
                  'rounded-sm p-0.5  flex items-center gap-1.5'
                )}
              >
                <Flag size={'15px'} />
                <span>{priority.label}</span>
              </span>
              {/* {repea} */}
              {todo.repeat[0] > 0 && (
                <div
                  className={clsx(
                    'bg-blue-500/40 text-blue-200 rounded-sm',
                    'flex gap-1 px-1 items-center'
                  )}
                >
                  <RefreshCw size={'15px'} className={clsx()} />
                  <span>{repeatLabels[todo.repeat[0]]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-400/30 p-2 rounded-lg transition cursor-pointer duration-200 scale-0 group-hover:scale-100"
        >
          <Trash2 size={'20px'} className="text-red-400 " />
        </div>
      </li>
    );
  };

  if (loading) {
    <div>Loading....</div>;
  }

  return (
    <div className="w-full mt-5">
      {todos && todos.length > 0 ? (
        <div>
          {/* priority = 1 */}
          {sections.map((section) => (
            <div key={section.key}>
              <div className="flex justify-center my-5">
                <div className={clsx('w-[50%] h-6 rounded-[5px]', section.divederClass)} />
              </div>
              <div className="flex flex-col gap-3">
                {section.todo.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={deleteTodo}
                    onToggle={toggleComplete}
                  />
                ))}
              </div>
              {/* <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleComplete} /> */}
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Todos;
