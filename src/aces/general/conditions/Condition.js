export const config = {
  highlight: true,
  deprecated: false,
  listName: "Sample Condition",
  displayText: "Sample Condition",
  description: "This is a sample condition",
  params: [
    {
      id: "param1",
      name: "Param1",
      desc: "This is a sample param",
      type: "string",
      initialValue: "Hello World",
    },
  ],
};

export const expose = true;

export default function (param) {
  return param === "Hello World";
}
