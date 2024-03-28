import { Outlet } from 'react-router-dom';

const ViewOutlet = () => {
  return (
    <section className="p-4 border-2 rounded-lg bg-white h-full overflow-y-scroll">
      <Outlet />
    </section>
  );
};

export default ViewOutlet;
