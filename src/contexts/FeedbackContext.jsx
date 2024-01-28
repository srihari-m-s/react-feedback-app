import { createContext, useEffect, useState } from "react";
// import { feedbackData } from "../constants/feedback";

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await fetch("/feedback");
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedbacks();
  }, []);

  // Delete Feedback
  async function handleDeleteFeedback(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await fetch(`/feedback/${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }

      setFeedback((prev) => prev.filter((item) => item.id !== id));
    }
  }

  //   Add Feedback
  async function addFeedback(newFeedback) {
    setLoading(true);
    try {
      const response = await fetch("/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      });

      const data = await response.json();
      setFeedback((prev) => {
        return [...prev, { ...data }];
      });
    } catch (error) {
      console.error("Error adding feedback:", error);
    } finally {
      setLoading(false);
    }
  }

  //   Edit feedback Item
  function editFeedback(item) {
    setFeedbackEdit({
      item,
      edit: true,
    });
  }

  //   Update feedback
  async function updateFeedback(id, updatedFeedback) {
    try {
      setLoading(true);
      const response = await fetch(`/feedback/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFeedback),
      });
      const data = await response.json();
      setFeedback((prev) => {
        return prev.map((item) =>
          item.id === id ? { ...item, ...data } : item
        );
      });
    } catch (error) {
      console.error("Error updating feedback:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        loading,
        handleDeleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackContext;
