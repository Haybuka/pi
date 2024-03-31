import ProfileFields from './fields';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';
import { useGetImageFile } from '../../api/getImageFile';
import { useGetSelf } from '../../api/login';
import styles from './profile.module.css';

const Index = () => {
  const { data: profile, isFetched: isProfileFetched } = useGetSelf();

  const logoRef = isProfileFetched && profile?.organization?.logo;

  const options = {
    fileAlias: logoRef,
    enabled: logoRef ? true : false,
  };
  const { data: imageFile = [], isFetched: imageFetched } =
    useGetImageFile(options);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/settings');
  };

  return (
    <main className={styles.profile}>
      <div className="flex justify-center">
        <p className="w-32 h-32 my-6 bg-gray-200 rounded-full overflow-hidden">
          {imageFetched && (
            <img
              alt=""
              className="w-full h-full"
              src={imageFile[imageFile?.length - 1]?.fullPath}
            />
          )}
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4 my-6">
        <ProfileFields
          value={profile?.fullname}
          label="fullname"
          classProp="col-span-12 md:col-span-6 capitalize"
        />
        <ProfileFields
          value={profile?.username}
          label="username"
          classProp="col-span-12 md:col-span-6 capitalize"
        />
      </div>
      <ProfileFields value={profile?.email} label="email" classProp="my-6" />
      <div className="grid grid-cols-12 gap-4 my-6">
        <ProfileFields
          value={
            profile?.organization
              ? profile?.organization?.phone
              : '080 000 0001'
          }
          label="phone"
          classProp="col-span-12 md:col-span-6"
        />

        <ProfileFields
          value={profile?.gender ? profile?.gender : 'not specified'}
          label="gender"
          classProp="col-span-12 md:col-span-6"
        />
      </div>

      <Button text={'edit profile'} handleClick={handleClick} />
    </main>
  );
};

export default Index;
