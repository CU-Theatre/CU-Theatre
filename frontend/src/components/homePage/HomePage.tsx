import styles from './homePage.module.scss';
import { Welcome } from './welcomeSection/Welcome';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <Welcome />
      </div>
    </div>
  );
};