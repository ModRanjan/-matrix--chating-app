import { useState } from 'react';
import { BsHash } from 'react-icons/bs';
import { BsPersonFill } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';

const topics = ['tailwind-css', 'react'];
const questions = ['jit-compilation', 'purge-files', 'dark-mode'];
const random = ['variants', 'plugins'];

const Channelbar = () => {
  return (
    <div className="h-auto m-0 ml-16 overflow-hidden bg-gray-200 shadow-lg w-80 dark:bg-gray-800">
      <div className="flex items-center justify-center p-0 m-0 h-14">
        <h5 className="my-auto ml-2 mr-auto text-lg font-medium tracking-tight text-gray-600 align-middle dark:text-gray-600">
          Home
        </h5>
      </div>

      <div className="flex flex-col items-center justify-start p-1 m-0">
        <Dropdown header="people" selections={topics} />
        <Dropdown header="Rooms" selections={questions} />
      </div>
    </div>
  );
};

const Dropdown = ({ header, selections }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="dropdown">
      <div onClick={() => setExpanded(!expanded)} className="dropdown-header">
        <ChevronIcon expanded={expanded} />
        <h5
          className={
            expanded
              ? 'text-lg font-medium text-blue-500 text-opacity-90'
              : 'text-lg font-medium text-gray-500 cursor-default text-opacity-90'
          }
        >
          {header}
        </h5>
        <FaPlus
          size="12"
          className="my-auto ml-auto text-accent text-opacity-80"
        />
      </div>
      {expanded &&
        selections &&
        selections.map((selection, index) => (
          <TopicSelection key={index} selection={selection} />
        ))}
    </div>
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size="14" className={chevClass} />
  ) : (
    <FaChevronRight size="14" className={chevClass} />
  );
};

const TopicSelection = ({ selection }) => (
  <div className="dropdown-selection">
    <BsPersonFill
      size="24"
      className="w-10 h-10 text-white bg-purple-400 rounded-full"
    />
    <h5 className="dropdown-selection-text">{selection}</h5>
  </div>
);

export default Channelbar;
