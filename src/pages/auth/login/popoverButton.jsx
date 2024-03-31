import { Popover } from '@headlessui/react';
import { ReactComponent as SettingsIcon } from './settingsIcon.svg';
import styles from './popover.module.css';

const PopoverButton = ({ open }) => {
  return (
    <Popover.Button as="aside" className={styles.button}>
      <p className={styles.popoverHead}>
        <span className={styles.popoverSpan}>
          <SettingsIcon />
        </span>
        <span className={styles.popoverSpan2}>Account Type</span>
      </p>
    </Popover.Button>
  );
};

export default PopoverButton;
