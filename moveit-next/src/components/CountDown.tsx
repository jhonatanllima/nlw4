import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/CountDown.module.css';

// pra eu conseguir saber o formato
let countdownTimeout: NodeJS.Timeout; 

export function CountDown() {
  const { startNewChallenge } =useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  //arredonda sempre pra baixo
  const minutes = Math.floor(time / 60); 
  const seconds = time % 60;

  // padstart se nao tiver dois numeros ele preenche  o da esquerda com 0
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  function resetCountDown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
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
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

    {hasFinished ? (
      <button 
        disabled
        className={styles.countountDownButton} 
      >
        <p> Ciclo encerrado </p>
        <span />
      </button>
    ) : (
      <>
        {isActive ? (
          <button 
            type="button" 
            className={`${styles.countountDownButton} ${styles.countountDownButtonActive}`} 
            onClick={resetCountDown}
          >
            Abandonar ciclo
          </button>

        ) : (

        <button 
          type="button" 
          className={styles.countountDownButton}
          onClick={startCountDown}
        >
          Iniciar um ciclo
        </button>
        
        )}
      </>
    )}  


    </div>
  );
}