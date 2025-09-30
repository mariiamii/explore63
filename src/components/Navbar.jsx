import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink> | {' '}
      <NavLink to='/bucketlist'>My Bucket List</NavLink>
    </nav>
  );
};

export default Navbar;
