import { useState } from 'react';
import { FaSearch, FaRegBell, FaMoon, FaSun } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { HiInformationCircle } from 'react-icons/hi';

const TopNavigation = ({ channelName }) => {
  return (
    <div className="top-navigation">
      <div className="p-1 text-center">
        <BsPersonFill size="32" className="title-hashtag" />
      </div>

      <Title text={channelName} />
      <ThemeIcon />
      <Search />

      <div className="text-center">
        <FaRegBell size="24" className="top-navigation-icon" />{' '}
      </div>

      <div className="text-center">
        <HiInformationCircle size="24" className="top-navigation-icon" />
      </div>
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useState();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="top-navigation-icon" />
      ) : (
        <FaMoon size="24" className="top-navigation-icon" />
      )}
    </span>
  );
};

const Search = () => (
  <div className="search">
    <input className="search-input" type="text" placeholder="Search..." />
    <FaSearch size="18" className="my-auto text-secondary" />
  </div>
);

const Title = ({ text }) => <h5 className="title-text">{text}</h5>;

export default TopNavigation;
