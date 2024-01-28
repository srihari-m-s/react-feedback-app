import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import "./FeedbackItem.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { useContext } from "react";
import FeedbackContext from "../../contexts/FeedbackContext";

export default function FeedbackItem({ item }) {
  const { handleDeleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <Card size={"4"} variant="classic" className="">
      <Flex justify={"between"} align={"center"}>
        <Box px={"4"} className="">
          <span
            style={{ backgroundColor: "var(--accent-9)" }}
            className="absolute top-0 -left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          >
            {item.rating}
          </span>
          <Text>{item.text}</Text>
        </Box>
        <Flex align={"center"} gap={"4"}>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => editFeedback(item)}
          >
            <MdEdit size={20} />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => handleDeleteFeedback(item.id)}
          >
            <MdDelete color="#ff000088" size={20} />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
