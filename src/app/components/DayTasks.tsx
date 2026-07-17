'use client';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useFirebase } from '../Provider/FirebaseProvider';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Stepper = ({ value, onChange }) => (
  <div className="relative flex items-center shadow-xs">
    <button
      type="button"
      onClick={() => onChange(Math.max(0, value - 1))}
      className={clsx(
        'bg-gray-700 border border-gray-600 hover:bg-gray-600',
        'cursor-pointer font-medium rounded-l-lg text-sm px-3 h-10 text-white'
      )}
    >
      <Minus className="w-3 h-3" />
    </button>
    <div className="h-10 w-12 flex items-center justify-center bg-[#0a0c10] border-y border-gray-600 text-white text-sm">
      {value}
    </div>
    <button
      type="button"
      onClick={() => onChange(Math.min(10, value + 1))}
      className={clsx(
        'bg-gray-700 border border-gray-600 hover:bg-gray-600',
        'cursor-pointer font-medium rounded-r-lg text-sm px-3 h-10 text-white'
      )}
    >
      <Plus className="w-3 h-3" />
    </button>
  </div>
);

const inputCls = clsx(
  'border-blue-400/20 border-2 p-4 w-full rounded-2xl outline-none text-white',
  'shadow-[0_0_6px_rgba(59,130,246,0.25)] bg-[#0a0c10]',
  'focus:shadow-[0_0_10px_rgba(59,130,246,0.75)] duration-250',
  'focus:border-blue-400/50 h-13'
);

const DayTasks = () => {
  // ── Add modal state ──
  const [showAdd, setShowAdd] = useState(false);
  const [addName, setAddName] = useState('');
  const [addComment, setAddComment] = useState('');
  const [addPercent, setAddPercent] = useState(5);

  // ── Edit modal state ──
  const [editTask, setEditTask] = useState<null | {
    id: string;
    name: string;
    comment: string;
    percent: number;
  }>(null);

  const { addDailyTask, dailyTasks, deleteDailyTask, editeDailyTask } = useFirebase();

  // ── Add handlers ──
  const openAdd = () => {
    setAddName('');
    setAddComment('');
    setAddPercent(5);
    setShowAdd(true);
  };

  const handleAdd = async () => {
    if (!addName.trim()) return;
    await addDailyTask({ name: addName.trim(), comment: addComment.trim(), percent: addPercent });
    setShowAdd(false);
  };

  // ── Edit handlers ──
  const openEdit = (task) => {
    setEditTask({
      id: task.id,
      name: task.name,
      comment: task.comment,
      percent: task.percent ?? 0,
    });
  };

  const handleSave = async () => {
    if (!editTask || !editTask.name.trim()) return;
    await editeDailyTask(
      editTask.id,
      editTask.name.trim(),
      editTask.comment.trim(),
      editTask.percent
    );
    setEditTask(null);
  };

  const handleDelete = async () => {
    if (!editTask) return;
    await deleteDailyTask(editTask.id);
    setEditTask(null);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0c10] flex justify-center p-4">
      <div className="max-w-lg w-full">
        <div
          className={clsx(
            'bg-[#0c121c]/75 border p-8 min-h-[50%]',
            'rounded-3xl shadow-[0_0_10px_rgba(59,130,246,0.25)] border-blue-400/20'
          )}
        >
          {/* ── Header ── */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#eef5ff]">Day Tasks</h1>
          </div>

          {/* ── Top bar ── */}
          <div className="mt-8 flex justify-between items-center">
            <p className="text-gray-300/90">
              {dailyTasks.length === 0
                ? 'No tasks for today !!!'
                : `${dailyTasks.length} task${dailyTasks.length > 1 ? 's' : ''}`}
            </p>
            <button
              onClick={openAdd}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors duration-300"
            >
              Add Task
            </button>
          </div>

          <div className="my-5 bg-gradient-to-r from-transparent via-blue-800 to-transparent w-full h-px" />

          {/* ── Task list ── */}
          <ul className="flex flex-col gap-2">
            {dailyTasks.map((task) => (
              <li
                key={task.id}
                onClick={() => openEdit(task)}
                className={clsx(
                  'text-[#eef5ff] text-lg flex items-center justify-between px-4 py-3',
                  'rounded-xl border border-blue-400/10 hover:border-blue-400/40',
                  'hover:bg-blue-400/5 cursor-pointer transition-all duration-200'
                )}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{task.name}</span>
                  {task.comment && (
                    <span className="text-sm bg-gray-400 rounded-sm px-1 py-0.5 w-max text-gray-800/90">
                      {task.comment}
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-lg">
                  {task.percent ?? 0}/10
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ════ ADD MODAL ════ */}
      {showAdd && (
        <>
          <div className="fixed inset-0 z-30 bg-black/50" onClick={() => setShowAdd(false)} />
          <div
            className={clsx(
              'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'bg-gray-900 border border-gray-700 p-6 rounded-2xl w-[90%] max-w-md',
              'shadow-[0_0_24px_rgba(59,130,246,0.3)]'
            )}
          >
            <h2 className="text-white font-semibold text-lg mb-4">New Task</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                placeholder="Task name"
                className={inputCls}
              />
              <input
                type="text"
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
                placeholder="Comment (optional)"
                className={inputCls}
              />
              <div className="flex items-center justify-between px-1">
                <span className="text-gray-400 text-sm">Priority (0–10)</span>
                <Stepper value={addPercent} onChange={setAddPercent} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </>
      )}

      {/* ════ EDIT MODAL ════ */}
      {editTask && (
        <>
          <div className="fixed inset-0 z-30 bg-black/50" onClick={() => setEditTask(null)} />
          <div
            className={clsx(
              'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'bg-gray-900 border border-gray-700 p-6 rounded-2xl w-[90%] max-w-md',
              'shadow-[0_0_24px_rgba(59,130,246,0.3)]'
            )}
          >
            <h2 className="text-white font-semibold text-lg mb-4">Edit Task</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={editTask.name}
                onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
                placeholder="Task name"
                className={inputCls}
              />
              <input
                type="text"
                value={editTask.comment}
                onChange={(e) => setEditTask({ ...editTask, comment: e.target.value })}
                placeholder="Comment (optional)"
                className={inputCls}
              />
              <div className="flex items-center justify-between px-1">
                <span className="text-gray-400 text-sm">Priority (0–10)</span>
                <Stepper
                  value={editTask.percent}
                  onChange={(val) => setEditTask({ ...editTask, percent: val })}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handleDelete}
                className="bg-red-400/20 p-2 rounded-lg hover:bg-red-400/40 transition-colors"
              >
                <Trash2 size={20} className="text-red-400" />
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditTask(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DayTasks;
