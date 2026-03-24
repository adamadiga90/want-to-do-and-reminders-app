import React from 'react';
import AppContextProvider from './AppContext';
import TodoList from './home/TodoList';
import { FirebaseProvider } from './Provider/FirebaseProvider';

const page = () => {
  return (
    <AppContextProvider>
      <FirebaseProvider>
        <TodoList />
      </FirebaseProvider>
    </AppContextProvider>
  );
};

export default page;
