'use client';
import React, { useState, useEffect, useContext } from 'react';

const AppContext = React.createContext();
export function useCheckDaysToEnd() {
  return useContext(AppContext);
}
const AppContextProvider = ({ children }) => {
  const [monthsDays, setMonthsDays] = useState([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

  useEffect(() => {
    checkLeapYear();
    checkDay();
  }, []);

  function checkLeapYear() {
    const currentYear = new Date().getFullYear();
    if ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) {
      setMonthsDays((prevMonthsDays) => [
        ...prevMonthsDays.slice(0, 1),
        29,
        ...prevMonthsDays.slice(2),
      ]);
    }
  }

  function checkDay() {
    const currentDay = new Date().getDay();
    const currentMonth = new Date().getMonth();
  }
  let theCounter = 0;
  theCounter = monthsDays[7] + monthsDays[11] + monthsDays[10] + monthsDays[9] + monthsDays[8];

  let days = 0;
  for (let i = 0; i < monthsDays.length; i++) {
    days += monthsDays[i];
  }

  function checkDaysAndToEnd() {
    const theDate = new Date();
    const today = theDate.getDay();
    const month = theDate.getMonth();
    const date = theDate.getDate();
    const year = theDate.getFullYear();
    const dateIn = JSON.stringify(theDate);
    const newDate = dateIn.split(':')[0];

    let daysToEndCount = 0;
    for (let i = month; i < monthsDays.length; i++) {
      daysToEndCount += monthsDays[i];
    }

    daysToEndCount = daysToEndCount - date;
    const daysCount = 365 - daysToEndCount;
    const allData = [daysCount, daysToEndCount, days, year];
    return allData;
    // return [daysCount, daysToEndCount, days, year];
  }

  useEffect(() => {
    const daysAndToEnd = checkDaysAndToEnd();
    localStorage.setItem('days-and-to-end', JSON.stringify(daysAndToEnd));
  }, []);
  return <AppContext.Provider value={checkDaysAndToEnd()}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
