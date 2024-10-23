import React from 'react';

interface HealthTopicCardProps {
  title: string;
  description: string;
}

const HealthTopicCard: React.FC<HealthTopicCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h4 className="text-lg font-semibold text-blue-600">{title}</h4>
      <p className="mt-2 text-gray-600">{description}</p>
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
        Learn More
      </button>
    </div>
  );
};

export default HealthTopicCard;
