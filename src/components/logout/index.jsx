import React, { useContext } from 'react';
import Modal from '../modal/modal';
import { AuthContext } from '../../context/authContext';
import Button from '../button/button';

const LogOut = () => {
  const { isLogOut, handleSetLogOut, handleLogOut } = useContext(AuthContext);

  return (
    <>
      {isLogOut && (
        <Modal handleModal={handleSetLogOut}>
          <section className="w-[400px] ">
            <h3 className="text-center"> are you sure to logout ?</h3>
            <p className="flex justify-between items-center">
              <Button
                text={'Logout'}
                classProp={' my-4 bg-red-600'}
                handleClick={() => {
                  handleSetLogOut();
                  handleLogOut();
                }}
              />
              <Button
                text={'Cancel'}
                classProp={' my-4 mx-4'}
                handleClick={() => {
                  handleSetLogOut();
                }}
              />
            </p>
          </section>
        </Modal>
      )}
    </>
  );
};

export default LogOut;
