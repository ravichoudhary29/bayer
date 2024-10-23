"use client";
import HealthTopicCard from "@/components/HealthTopicCard";
import HeroSection from "@/components/HeroSection";
import withLayout from "@/hoc/withLayout";
import React, { useState } from "react";

// Define TypeScript interfaces for health topics
interface HealthTopic {
  title: string;
  description: string;
}

const HomePage: React.FC = () => {
  // Hardcoded array of health topics (to be replaced by API call)
  const [healthTopics] = useState<HealthTopic[]>([
    {
      title: "COVID-19 Updates",
      description:
        "Stay informed about the latest COVID-19 guidelines and vaccination information.",
    },
    {
      title: "Heart Health",
      description:
        "Discover tips and information for maintaining a healthy heart and cardiovascular system.",
    },
    {
      title: "Mental Wellness",
      description:
        "Explore resources and support options for maintaining good mental health.",
    },
  ]);

  return (
    <div>
      <HeroSection />

      <section
        id="health-topics"
        className="py-12 bg-gray-100"
        aria-labelledby="featured-topics-heading"
      >
        <div className="container mx-auto px-4">
          <h3
            id="featured-topics-heading"
            className="text-2xl font-bold text-gray-800 mb-8"
          >
            Featured Health Topics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthTopics.map((topic, index) => (
              <HealthTopicCard
                key={index}
                title={topic.title}
                description={topic.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Wrap the HomePage component with the layout HOC
export default withLayout(HomePage);
