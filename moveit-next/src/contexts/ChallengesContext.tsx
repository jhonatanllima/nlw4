import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
  closeLevelUpModal: () => void,
  startNewChallenge: () => void,
  completedChallenge: () => void,
  experienceToNextLevel: number, 
}

interface ChallengesProviderProps{
  level: number,
  children: ReactNode;
  currentExperience: number,
  challengesCompleted: number,
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children, ...rest}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExprience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1 ) * 4,2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  },[level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
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
    setChallengesCompleted(challengesCompleted + 1);
  }
  
  return (
    <ChallengesContext.Provider value={{
      level, 
      levelUp,
      resetChallenge,
      activeChallenge,
      startNewChallenge,
      closeLevelUpModal,
      currentExperience, 
      completedChallenge,
      challengesCompleted,
      experienceToNextLevel
    }}>
      {children}
      { isLevelModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  );
}