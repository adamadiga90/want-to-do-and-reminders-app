'use client';
import React, { useEffect, useState } from 'react';

import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useFirebase } from '../Provider/FirebaseProvider';
import { Trash2, Flag, RefreshCw, CheckCircle2, Circle } from 'lucide-react';
import clsx from 'clsx';

const Todos = () => {
  const { todos, deleteTodo } = useFirebase();

  const priorityConfig = {
    1: { label: 'High', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    2: {
      label: 'Medium',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    3: {
      label: 'Low',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
    },
  };

  const repeatLabels = ['', 'Daily', 'Weekly', 'Monthly'];

  return (
    <div className="w-full">
      {todos && todos.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {todos.map((todo: any, index: number) => {
            const priority =
              priorityConfig[todo.priority as keyof typeof priorityConfig] || priorityConfig[3];

            return (
              <li
                key={todo.id}
                className={clsx(
                  'group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-200',
                  'bg-[#141c28]/60 backdrop-blur-sm',
                  'border border-blue-400/10 hover:border-blue-400/25',
                  'hover:bg-[#1a2436]/60 hover:shadow-lg hover:shadow-blue-900/10',
                  'animate-fade-in-up'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Priority Indicator Line */}
                <div
                  className={clsx('absolute left-0 top-3 bottom-3 w-1 rounded-full', {
                    'bg-red-500': todo.priority === 1,
                    'bg-amber-500': todo.priority === 2,
                    'bg-emerald-500': todo.priority === 3,
                  })}
                />

                {/* Checkbox */}
                <button className="ml-2 p-1 rounded-full hover:bg-white/5 transition-colors">
                  <Circle className="w-5 h-5 text-[#6c86a3] hover:text-blue-400 transition-colors" />
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#eef3fc] font-medium text-base truncate">{todo.name}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    {/* Priority Badge */}
                    <span
                      className={clsx(
                        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium',
                        priority.bg,
                        priority.color
                      )}
                    >
                      <Flag className="w-3 h-3" />
                      {priority.label}
                    </span>

                    {/* Repeat Badge */}
                    {todo.repeat > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400">
                        <RefreshCw className="w-3 h-3" />
                        {repeatLabels[todo.repeat]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={clsx(
                    'p-2.5 rounded-xl transition-all duration-200',
                    'opacity-0 group-hover:opacity-100',
                    'bg-red-500/10 hover:bg-red-500/20',
                    'text-red-400 hover:text-red-300',
                    'hover:scale-105 active:scale-95'
                  )}
                  aria-label="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-blue-400/60" />
          </div>
          <p className="text-[#9ab3d5] text-sm font-medium">No tasks yet</p>
          <p className="text-[#6c86a3] text-xs mt-1">Add a task above to get started</p>
        </div>
      )}
    </div>
  );
};

export default Todos;
