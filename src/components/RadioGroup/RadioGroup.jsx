import { Flex } from "@radix-ui/themes";
import "./RadioGroup.css";

export default function RadioGroup({ rating, setRating }) {
  function handleRadioChange(e) {
    let { value } = e.target;

    setRating(value);
  }

  return (
    <Flex align={"center"} justify={"center"} wrap={"wrap"} gap={"4"}>
      {Array(10)
        .fill(0)
        .map((elem, index) => {
          return (
            <label
              htmlFor={`rating${index + 1}`}
              key={`${elem}-${index}`}
              className="radio-label"
            >
              <input
                type="radio"
                name="rating"
                value={index + 1}
                id={`rating${index + 1}`}
                className="sr-only"
                onChange={handleRadioChange}
                checked={+rating === index + 1}
              />
              {index + 1}
            </label>
          );
        })}
    </Flex>
  );
}
