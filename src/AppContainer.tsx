import React from "react";

const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 items-center py-4">
      {props.children}
    </div>
  );
};

export default AppContainer;
