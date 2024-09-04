"use client";

import { Cpu, User, Award } from "lucide-react";

const StatsSection = () => {
  return (
    <div className="bg-primaryDark py-10 md:py-12">
      <section className="flex justify-center items-center container mx-auto">
        <div className="relative flex justify-center items-center flex-col md:flex-row xl:gap-36 lg:gap-24">
          {/* Vertical line between columns */}
          <div className="absolute inset-y-0 left-1/3 transform -translate-x-1/2 mt-3 translate-y-1/2 w-px bg-gray-400 lg:block hidden h-10"></div>
          <div className="absolute inset-y-0 left-2/3 transform -translate-x-1/2 mt-3 translate-y-1/2 w-px bg-gray-400 lg:block hidden h-10"></div>

          <StatCard
            icon={<Cpu />}
            title="100K+"
            description="AI model submissions"
          />
          <StatCard
            icon={<User />}
            title="50K+"
            description="Data Scientists"
          />
          <StatCard
            icon={<Award />}
            title="100+"
            description="AI Challenges hosted"
          />
        </div>
      </section>
    </div>
  );
};

const StatCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative flex justify-center flex-col items-center w-full lg:w-1/3">
      <div className="flex items-start gap-4 p-6 w-full">
        <div className="flex-shrink-0 flex items-center justify-center bg-white p-4 rounded-xl">
          {icon}
        </div>
        <div className="text-white w-full">
          <h3 className="text-2xl font-bold mb-2 truncate">{title}</h3>
          <p className="text-gray-300 text-sm truncate">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
