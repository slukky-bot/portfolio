import React from "react";

import TypingTest from "@/components/TypingTest";
import Portfolio4 from "@/components/Hero";
import NewsList from "@/components/News";

const Home = () => {
  return (
    <div className="mb-10">
      <Portfolio4 />
      <NewsList />
      <TypingTest />
    </div>
  );
};

export default Home;
