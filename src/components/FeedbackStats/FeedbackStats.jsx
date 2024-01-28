import { Flex, Heading } from "@radix-ui/themes";
import { useContext } from "react";
import FeedbackContext from "../../contexts/FeedbackContext";

export default function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);

  let average =
    feedback.reduce((acc, cur) => {
      return acc + +cur.rating;
    }, 0) / feedback.length;

  average = average.toFixed(1).replace(/[,.]0$/, "");

  return (
    <div className="">
      <Flex justify={"between"}>
        <Heading size={"4"}>{feedback.length} Reviews</Heading>
        <Heading size={"4"}>
          Average Rating: {isNaN(average) ? 0 : average}
        </Heading>
      </Flex>
    </div>
  );
}
