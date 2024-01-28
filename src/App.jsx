import "./App.css";
import Header from "./components/Header/Header";
// import { feedbackData } from "./constants/feedback";
// import { useState } from "react";
import FeedbackList from "./components/FeedbackList/FeedbackList";
import FeedbackStats from "./components/FeedbackStats/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import { FeedbackProvider } from "./contexts/FeedbackContext";

function App() {
  return (
    <>
      <FeedbackProvider>
        <Header />
        <div className="max-w-2xl mx-auto py-4 flex flex-col gap-4 px-4 md:px-0">
          <FeedbackForm />
          <FeedbackStats />
          <FeedbackList />
        </div>
      </FeedbackProvider>
    </>
  );
}

export default App;
