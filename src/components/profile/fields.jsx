import React from 'react';
import styles from './profile.module.css';
import cls from 'classnames';
const ProfileFields = ({ value, label, classProp }) => {
  return (
    <section className={cls(styles.field_container, classProp)}>
      <h3 className={cls(styles.field_title, classProp)}>
        {value ? value : label}
      </h3>
      <p className={styles.field_label}>{label}</p>
    </section>
  );
};

export default ProfileFields;
