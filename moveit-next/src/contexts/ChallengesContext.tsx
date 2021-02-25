import { createContext, useState, ReactNode } from 'react';

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
  startNewChallenge: () => void
  experienceToNextLevel: number, 
}

interface ChallengesProviderProps{
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children}: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExprience] = useState(3);
  const [challengesCompleted, setChallenfesCompleted] = useState(0);
  
  const[activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1 ) * 4,2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge(){
    // retorna um numero aleatorio arredondando para baixo
    const randowChallengeIndex = Math.floor(Math.random() * challenges.length)

    const challenge = challenges[randowChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }
  
  return (
    <ChallengesContext.Provider value={{
      level, 
      levelUp,
      resetChallenge,
      activeChallenge,
      startNewChallenge,
      currentExperience, 
      challengesCompleted,
      experienceToNextLevel
    }}>
      {children}
    </ChallengesContext.Provider>
  );
}