import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const withLayout = <P extends object>(Component: React.ComponentType<P>) => {
  return function WithLayout(props: P) {
    return (
      <div>
        <Header />
        <main>
          <Component {...props} />
        </main>
        <Footer />
      </div>
    );
  };
};

export default withLayout;
