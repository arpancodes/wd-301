import React from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header
          title={`Welcome to Lesson ${
            4 + 2
          } of #react-typescript with #tailwindcss`}
        />
        <AppRouter />
      </div>
    </AppContainer>
  );
}

export default App;
