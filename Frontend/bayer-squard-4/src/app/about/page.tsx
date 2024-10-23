import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const About = () => {
  return (<div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <p>This is about us page</p>
    </main>
    <Footer />
  </div>);
};

export default About;
