'use client';
import React, { useEffect, useRef, useState } from 'react';

import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import Todos from '../components/Todos';
import { useFirebase } from '../Provider/FirebaseProvider';
import clsx from 'clsx';
import { Flag, RefreshCw, Plus, X } from 'lucide-react';

const TodoList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [priority, setPriority] = useState<number>(1);
  const [repeat, setRepeat] = useState(0);
  const [prioVis, setPrioVis] = useState(false);
  const [repVis, setRepVis] = useState(false);

  const { addTodo } = useFirebase();

  const prioRef = useRef<HTMLDivElement>(null);
  const repRef = useRef<HTMLDivElement>(null);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addTodo({ name, priority, repeat });
    setName('');
    setPriority(1);
    setRepeat(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ name });
    setName('');
  };

  const priorityLabels = ['High', 'Medium', 'Low'];
  const repeatLabels = ['None', 'Daily', 'Weekly', 'Monthly'];
  return (
    <div className={clsx('relative min-h-screen bg-[#0a0c10] flex justify-center p-4')}>
      <div className={clsx('max-w-lg w-full relative')}>
        <div
          className={clsx(
            ' bg-[#0c121c]/75 border p-8',
            ' rounded-3xl shadow-[0_0_10px_rgba(59,130,246,0.25)] border-blue-400/20'
          )}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl text-balance text-[#eef5ff] font-bold">My Tasks</h1>
          </div>
          {/* TODO: handleSubmit function */}
          <form className="flex justify-center w-full" onSubmit={(e) => handleSubmit(e)}>
            <div className="relative group w-full ">
              <input
                className={clsx(
                  'border-blue-400/20 border-2 p-4 w-full rounded-2xl outline-0',
                  'shadow-[0_0_6px_rgba(59,130,246,0.25)] bg-[#0a0c10]',
                  'focus:shadow-[0_0_10px_rgba(59,130,246,0.75)] duration-250',
                  'focus:border-blue-400/50'
                )}
                placeholder="Add want todos..."
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div ref={prioRef} className="relative w-full flex gap-2 mt-5">
                <button
                  type="button"
                  onClick={(e) => {
                    setPrioVis(!prioVis);
                    setRepVis(false);
                  }}
                  className={clsx(
                    'group/priority',
                    'bg-[#141c28]/70 border-blue-400/20 rounded-2xl',
                    'flex items-center justify-start border-2 h-12.5 w-full',
                    'p-4 gap-2 text-sm cursor-pointer hover:border-blue-400/60',
                    ' duration-200 hover:shadow-[0_0_10px_rgba(59,130,246,0.75)]'
                  )}
                >
                  <Flag
                    className={clsx('w-4 ', {
                      'text-red-400 group/priority-hover:drop-shadow-[0_0_8px_white transition':
                        priority === 1,
                      'text-amber-400 group/priority-hover:text-amber-600 duration-200':
                        priority === 2,
                      'text-emerald-400 group/priority-hover:text-emerald-600 duration-200':
                        priority === 3,
                    })}
                  />
                  <span
                    className={clsx(
                      'flex-1 text-left transition group/priority-hover:text-white',
                      'group/priority-hover:drop-shadow-[0_0_5px_white]'
                    )}
                  >
                    {priorityLabels[priority - 1]}
                  </span>
                  <span
                    className={clsx('w-2 h-2 rounded-full', {
                      'bg-red-500 ': priority === 1,
                      'bg-amber-500': priority === 2,
                      'bg-emerald-500': priority === 3,
                    })}
                  />
                </button>
                {prioVis && (
                  <div
                    className={clsx(
                      'absolute p-4 flex left-0 right-0 top-full border-2',
                      'justify-center border-blue-400/20 ',
                      'flex-col w-[50%] rounded-2xl mt-2 bg-[#0a0c10]'
                    )}
                  >
                    <h1 className="text-[#9ab3d5] text-xs font-medium px-2 py-1 mb-1">
                      Set Priority
                    </h1>
                    <div className={clsx('flex flex-col')}>
                      {[
                        {
                          value: 1,
                          label: 'High',
                          color: 'bg-red-500 hover:bg-red-400',
                          dot: 'bg-red-500',
                        },
                        {
                          value: 2,
                          label: 'Medium',
                          color: 'bg-amber-500 hover:bg-amber-400',
                          dot: 'bg-amber-500',
                        },
                        {
                          value: 3,
                          label: 'Low',
                          color: 'bg-emerald-500 hover:bg-emerald-400',
                          dot: 'bg-emerald-500',
                        },
                      ].map((item) => (
                        <div
                          key={item.value}
                          onClick={() => {
                            setPriority(item.value);
                            setPrioVis(false);
                          }}
                          className={clsx(
                            'hover:bg-white/5 flex items-center rounded-xl',
                            'gap-3 px-2 py-2 transition duration-300 cursor-pointer',
                            {
                              'bg-white/10': priority === item.value,
                            }
                          )}
                        >
                          <span className={clsx(item.dot, 'w-2 h-2 rounded-full block')} />
                          <h1 className="flex-1 text-left">{item.label}</h1>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Repeat button */}
                <button
                  type="button"
                  onClick={() => {
                    setRepVis(!repVis);
                    setPrioVis(false);
                  }}
                  className={clsx(
                    'group/repeat ',
                    'bg-[#141c28]/70 border-blue-400/20 rounded-2xl',
                    'flex items-center justify-start border-2 h-12.5 w-full',
                    'p-4 gap-2 text-sm cursor-pointer hover:border-blue-400/60',
                    ' duration-200 hover:shadow-[0_0_10px_rgba(59,130,246,0.75)]'
                  )}
                >
                  <RefreshCw
                    className={clsx(
                      'w-4 text-blue-400 group/repeat-hover:drop-shadow-[0_0_8px_white transition'
                    )}
                  />
                  <span className="flex-1 text-left group/repeat-hover:text-white group/repeat-hover:drop-shadow-[0_0_5px_white] transition">
                    {repeatLabels[repeat]}
                  </span>
                </button>
                {repVis && (
                  <div
                    className={clsx(
                      'absolute p-4 flex left-56.5 top-full border-2',
                      'justify-center border-blue-400/20 ',
                      'flex-col w-[50%] rounded-2xl mt-2 bg-[#0a0c10]'
                    )}
                  >
                    <h1 className="text-[#9ab3d5] text-xs font-medium px-2 py-1 mb-1">
                      Set Repeat
                    </h1>
                    <div>
                      {repeatLabels.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setRepeat(i);
                            setRepVis(false);
                          }}
                          className={clsx(
                            'hover:bg-white/5 flex items-center rounded-xl',
                            'gap-3 px-2 py-2 transition duration-300 cursor-pointer',
                            {
                              'bg-white/10': repeat === i,
                            }
                          )}
                        >
                          <RefreshCw className={clsx('w-4 text-blue-400')} />
                          <h1>{item}</h1>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className={clsx(
                    'bg-blue-600 p-3 rounded-xl transition duration-300 ',
                    ' hover:bg-blue-500/95 hover:scale-110 cursor-pointer',
                    'disabled:hover:bg-blue-600/50 disabled:hover:scale-100',
                    ' disabled:bg-blue-600/50 disabled:cursor-auto'
                  )}
                >
                  <Plus />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TodoList;
