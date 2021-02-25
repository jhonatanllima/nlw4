import { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../../challenges.json';

interface Challenge{
  amount: number,
  description: string,
  type: 'body' | 'eye',
}

interface ChallengeContextData{
  level: number, 
  levelUp: () => void,
  currentExperience: number,
  resetChallenge: () => void,
  activeChallenge: Challenge;
  challengesCompleted: number,
  startNewChallenge: () => void,
  completedChallenge: () => void,
  experienceToNextLevel: number, 
}

interface ChallengesProviderProps{
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children}: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExprience] = useState(0);
  const [challengesCompleted, setChallenfesCompleted] = useState(0);
  
  const[activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1 ) * 4,2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge(){
    // retorna um numero aleatorio arredondando para baixo
    const randowChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randowChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted'){
      new Notification('Novo desafio 👾💥', {
        body: `Valendo ${challenge.amount} xp!!`
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if(!activeChallenge){
      return
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    
    if (finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExprience(finalExperience);
    setActiveChallenge(null);
    setChallenfesCompleted(challengesCompleted + 1);
  }
  
  return (
    <ChallengesContext.Provider value={{
      level, 
      levelUp,
      resetChallenge,
      activeChallenge,
      startNewChallenge,
      currentExperience, 
      completedChallenge,
      challengesCompleted,
      experienceToNextLevel
    }}>
      {children}
    </ChallengesContext.Provider>
  );
}