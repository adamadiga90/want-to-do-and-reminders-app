import React from 'react';
import AppContextProvider from './AppContext';
import TodoList from './home/TodoList';
import { FirebaseProvider } from './Provider/FirebaseProvider';
import DayTasks from './components/DayTasks';

const page = () => {
  return (
    <AppContextProvider>
      <FirebaseProvider>
        <div className="flex justify-center flex-col sm:flex-row">
          <TodoList />
          <DayTasks />
        </div>
      </FirebaseProvider>
    </AppContextProvider>
  );
};

export default page;
