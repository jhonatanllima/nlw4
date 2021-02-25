import Header from 'next/head';

import { Profile } from '../components/Profile';
import { CountDown } from '../components/CountDown';
import { ChallengeBox } from '../components/ChallengeBox';
import { ExperienceBar } from '../components/ExperienceBar';
import { CountdownProvider } from '../contexts/CountdownContext';
import { CompletedChallenges } from '../components/CompletedChallenges';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header>
        <title>Move.it</title>
      </Header>

      <ExperienceBar /> 

      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <CountDown />
          </div>
          <div style={{height:'33rem'}}>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
