'use client';
import React, { useEffect, useState } from 'react';

import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useFirebase } from '../Provider/FirebaseProvider';
import { Trash2, Flag, RefreshCw, CheckCircle2, Circle } from 'lucide-react';
import clsx from 'clsx';

const Todos = () => {
  const { todos, deleteTodo, loading, toggleComplete } = useFirebase();

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

  const repeatLabels = ['', 'Daily', '2/Days', '3/Days'];
  if (loading) {
    <div>Loading....</div>;
  }

  return (
    <div className="w-full mt-5">
      {todos && todos.length > 0 ? (
        <div>
          {/* priority = 1 */}

          <div className="flex justify-center mb-5">
            <div className={clsx('w-[50%] h-6 rounded-[5px]  bg-red-500 ')} />
          </div>
          <ul className={clsx('flex flex-col gap-3')}>
            {todos.map((todo: any, id: string) => {
              if (todo.priority !== 1 || todo.isComplete) return;
              const priority =
                priorityConfig[todo.priority as keyof typeof priorityConfig] || priorityConfig[3];
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
            })}
          </ul>

          <div className="flex justify-center my-5">
            <div
              className={clsx(
                'w-[50%] h-6 rounded-[5px] bg-gradient-to-b from-red-500 ',
                '  to-amber-500 '
              )}
            />
          </div>
          <ul className={clsx('flex flex-col gap-3')}>
            {todos.map((todo: any, id: string) => {
              if (todo.priority !== 2 || todo.isComplete) return;
              const priority =
                priorityConfig[todo.priority as keyof typeof priorityConfig] || priorityConfig[3];
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
                            'rounded-sm p-0.5 flex items-center gap-1.5'
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
            })}
          </ul>

          <div className="flex justify-center my-5">
            <div
              className={clsx(
                'w-[50%] h-6 rounded-[5px] bg-gradient-to-b from-amber-500 ',
                '  to-emerald-500 '
              )}
            />
          </div>
          <ul className={clsx('flex flex-col gap-3')}>
            {todos.map((todo: any, id: string) => {
              if (todo.priority !== 3 || todo.isComplete) return;
              const priority =
                priorityConfig[todo.priority as keyof typeof priorityConfig] || priorityConfig[3];
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
                            'rounded-sm p-0.5 flex items-center gap-1.5'
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
            })}
          </ul>

          <div className="flex justify-center my-5">
            <div className={clsx('w-[50%] h-6 rounded-[5px] bg-gray-500 ')} />
          </div>
          <ul className={clsx('flex flex-col gap-3')}>
            {todos.map((todo: any, id: string) => {
              if (!todo.isComplete) return;
              const priority =
                priorityConfig[todo.priority as keyof typeof priorityConfig] || priorityConfig[3];
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
                            'bg-gray-500/30 text-gray-200 rounded-sm p-0.5 flex items-center gap-1.5'
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
            })}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Todos;
