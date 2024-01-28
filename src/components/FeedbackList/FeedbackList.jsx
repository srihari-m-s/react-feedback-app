import { Flex, Heading } from "@radix-ui/themes";
import FeedbackItem from "../FeedbackItem/FeedbackItem";
import FeedbackContext from "../../contexts/FeedbackContext";
import { useContext } from "react";

export default function FeedbackList() {
  const { feedback, loading } = useContext(FeedbackContext);

  if (!loading && (!feedback || feedback.length === 0)) {
    return <p className="capitalize text-center">No feedback</p>;
  }

  return loading ? (
    <Flex justify={"center"} align={"center"} className="py-5">
      <Heading size={"6"} className="text-blue-500">
        ...loading
      </Heading>
    </Flex>
  ) : (
    <Flex direction={"column"} gap={"4"}>
      {feedback.map((item) => {
        return <FeedbackItem key={item.id} item={item} />;
      })}
    </Flex>
  );
}
