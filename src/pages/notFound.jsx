import { useNavigate } from 'react-router-dom';
import Button from '../components/button/button';

const NotFound = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <aside className="text-center">
        <h3 className="text-xl"> Ooops, Page not found</h3>
        <p>The requested resource could not be reached.</p>
        <Button text={'Home'} classProp={'my-3'} handleClick={handleRedirect} />
      </aside>
    </section>
  );
};

export default NotFound;
