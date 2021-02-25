import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
  minutes: number, 
  seconds: number,
  isActive: boolean,
  hasFinished: boolean,
  resetCountDown: () => void,
  startCountDown: () => void,
}

interface CountdownProviderProps{
  children: ReactNode;
}

export const CountdownContext =createContext({} as CountdownContextData);

// pra eu conseguir saber o formato
let countdownTimeout: NodeJS.Timeout; 

export function CountdownProvider({ children }: CountdownProviderProps){
  const { startNewChallenge } =useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  //arredonda sempre pra baixo
  const minutes = Math.floor(time / 60); 
  const seconds = time % 60;


  function resetCountDown(){
    clearTimeout(countdownTimeout);
    setTime(0.1 * 60);
    setIsActive(false);
    setHasFinished(false);
  }

  function startCountDown(){
    setIsActive(true);
  }

  useEffect(() => {
    if (isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes, 
      seconds,
      isActive,
      hasFinished,
      resetCountDown,
      startCountDown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}