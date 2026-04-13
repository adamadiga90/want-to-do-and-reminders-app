'use client';
import clsx from 'clsx';
import React, { useState } from 'react';

const DayTasks = () => {
  const [add, setAdd] = useState(false);
  const [name, setName] = useState('');
  return (
    <div className={clsx('relative min-h-screen bg-[#0a0c10] flex justify-center p-4')}>
      <div className={clsx('max-w-lg w-full  relative')}>
        <div
          className={clsx(
            ' bg-[#0c121c]/75 border p-8 min-h-[50%]',
            'rounded-3xl shadow-[0_0_10px_rgba(59,130,246,0.25)] border-blue-400/20'
          )}
        >
          <div className={clsx('text-center')}>
            <h1 className="text-2xl font-bold text-balance text-[#eef5ff]">Day Tasks</h1>
          </div>
          <div className={clsx('mt-8 relative')}>
            <div className={clsx('flex justify-around items-center ')}>
              <div className={clsx('text-lg text-[#eef5ff]')}>
                <p className={clsx('text-gray-300/90')}>No tasks for today !!!</p>
              </div>
              <div className={clsx('w-[33%]')}>
                <button
                  onClick={() => setAdd((prev) => !prev)}
                  className={clsx(
                    'px-4 py-2 rounded-lg bg-blue-500 text-white',
                    'hover:bg-blue-600 cursor-pointer transition-colors duration-300'
                  )}
                >
                  Add Task
                </button>
              </div>
            </div>
            {add && (
              <div
                className={clsx('fixed z-30 bg-black/50 inset-0')}
                onClick={() => setAdd(false)}
              />
            )}
            {add && (
              <div
                className={clsx(
                  'bg-gray-400/10 border mt-4 z-31 p-4 rounded-lg absolute w-full',
                  'shadow-[0_0_6px_rgba(59,130,246,0.55)] border-gray-300/20'
                )}
              >
                <form>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=""
                    className={clsx(
                      'border-blue-400/20 border-2 p-4 w-full rounded-2xl outline-0',
                      'shadow-[0_0_6px_rgba(59,130,246,0.25)] bg-[#0a0c10]',
                      'focus:shadow-[0_0_10px_rgba(59,130,246,0.75)] duration-250',
                      'focus:border-blue-400/50'
                    )}
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayTasks;
