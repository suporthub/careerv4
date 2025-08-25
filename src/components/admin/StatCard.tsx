import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'yellow' | 'green' | 'purple' | 'red';
}

const colorClasses = {
  blue: { bg: 'bg-blue-900/50', border: 'border-blue-500', text: 'text-blue-400' },
  yellow: { bg: 'bg-yellow-900/50', border: 'border-yellow-500', text: 'text-yellow-400' },
  green: { bg: 'bg-green-900/50', border: 'border-green-500', text: 'text-green-400' },
  purple: { bg: 'bg-purple-900/50', border: 'border-purple-500', text: 'text-purple-400' },
  red: { bg: 'bg-red-900/50', border: 'border-red-500', text: 'text-red-400' },
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const classes = colorClasses[color];
  return (
    <div className={`relative p-6 rounded-lg shadow-lg border-l-4 ${classes.border} ${classes.bg} flex items-center space-x-4`}>
      <div className={`rounded-full p-3 bg-slate-700 ${classes.text}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
