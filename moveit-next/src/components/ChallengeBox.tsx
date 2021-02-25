import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { resetCountDown } = useContext(CountdownContext);
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext);

  function handleChallengeSucceeded() {
    completedChallenge();
    resetCountDown();
  }

  function handleChallengeFailed () {
    resetChallenge();
    resetCountDown();
  }

  return (
    <div className={styles.challengeContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button  
              type="button"
              className={styles.challengeSucceedeButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            finalize um ciclo
            para receber desafios
          </strong>
          <p>
            <img src="icons/level-up.svg" alt=" Level Up"/>
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}