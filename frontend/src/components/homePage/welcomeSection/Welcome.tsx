import styles from './welcome.module.scss';

export const Welcome = () => {
  return (
    <div className={`home__welcome ${styles.welcome}`}>
      <div className={styles.welcome__container}>
        <div className={styles.welcome__content}>
          <h1 className={styles.welcome__title}>Welcome to  CU Theater</h1>
          <p className={styles.welcome__subtitle}>
            Discover the Unexpected: <br />
            Where Dublin Laughs, Heals and Rises
          </p>
        </div>
        <button className={`${styles.welcome__button} white-button`}>Learn more</button>
      </div>
    </div>
  );
};