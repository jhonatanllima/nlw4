import { useContext } from 'react';
import { CountdownContext} from '../contexts/CountdownContext';

import styles from '../styles/components/CountDown.module.css';

export function CountDown() {
  const {
    minutes, 
    seconds, 
    isActive, 
    hasFinished, 
    resetCountDown, 
    startCountDown
  } = useContext(CountdownContext);

  // padstart se nao tiver dois numeros ele preenche  o da esquerda com 0
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
  
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