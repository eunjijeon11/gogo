import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      {children}
    </section>
  );
}

export default Layout;
