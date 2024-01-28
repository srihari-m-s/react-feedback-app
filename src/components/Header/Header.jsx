import { Flex, Heading } from "@radix-ui/themes";

export default function Header({ text }) {
  return (
    <header>
      <Flex
        justify={"center"}
        align={"center"}
        className="px-2 py-4 bg-gray-900"
      >
        <Heading size={"8"} align={"center"} color="accent">
          {text}
        </Heading>
      </Flex>
    </header>
  );
}

Header.defaultProps = {
  text: "Feedback UI",
};
