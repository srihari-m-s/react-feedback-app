import { Button, Card, Flex, Text } from "@radix-ui/themes";
import RadioGroup from "../RadioGroup/RadioGroup";
import { useContext, useEffect, useRef, useState } from "react";
import FeedbackContext from "../../contexts/FeedbackContext";

export default function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback, loading } =
    useContext(FeedbackContext);

  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const reviewRef = useRef();

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setIsDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  function handleSubmit(e) {
    e.preventDefault();
    const newFeedback = { text: text, rating: rating };

    if (feedbackEdit.edit === true) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      addFeedback(newFeedback);
    }
    resetStates();
  }

  function handleChange(e) {
    let { value } = e.target;
    setText(value);

    if (!value) {
      setError("");
      setIsDisabled(true);
    } else if (value && value.trim().length < 10) {
      setError("Review should be atleast 10 characters");
      setIsDisabled(true);
    } else {
      setError("");
      setIsDisabled(false);
    }
  }

  function resetStates() {
    setText("");
    setRating(10);
    setIsDisabled(true);
    reviewRef.current.focus();
  }

  return (
    <Card size={"4"} variant="classic" className="">
      <form onSubmit={handleSubmit} className="">
        <Flex direction={"column"} gap={"4"} justify={"center"}>
          <Text size={"6"} align={"center"}>
            How would you rate your service with us?
          </Text>
          <Flex direction={"column"} gap={"1"}>
            <textarea
              type="text"
              name="text"
              id="text"
              className="bg-transparent placeholder:text-zinc-500 outline-none border border-zinc-800 p-3 rounded"
              placeholder="Write a Review..."
              rows={4}
              autoFocus
              value={text}
              onChange={handleChange}
              ref={reviewRef}
            ></textarea>
            {/* Error message */}
            <em
              className={`text-red-500 text-sm ${
                error ? "visible" : "invisible"
              }`}
            >
              {error}
            </em>
          </Flex>

          {/* Radio Group */}
          <RadioGroup rating={rating} setRating={setRating} />

          <Button
            variant="outline"
            radius="full"
            className="self-center"
            disabled={isDisabled || loading}
            type="submit"
          >
            {loading ? "Please wait" : "Submit"}
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
