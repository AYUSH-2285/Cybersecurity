
import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = "Analyzing..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin border-t-transparent"></div>
      <p className="text-blue-300 neon-shadow">{text}</p>
    </div>
  );
};

export default Loader;
