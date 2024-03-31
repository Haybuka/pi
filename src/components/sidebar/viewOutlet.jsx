import { Outlet } from 'react-router-dom';
import styles from './sidebar.module.css';

const ViewOutlet = () => {
  return (
    <section className={styles.outlet}>
      <Outlet />
    </section>
  );
};

export default ViewOutlet;
