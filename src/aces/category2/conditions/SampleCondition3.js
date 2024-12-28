export const config = {
  highlight: true,
  deprecated: false,
  listName: "Sample Action",
  displayText: "Sample action [i]{0}[/i]",
  description: "This is a sample action",
  params: [
    {
      id: "param1",
      name: "Param 1",
      desc: "The first parameter",
      type: "string",
      initialValue: "",
    },
  ],
};

export const expose = true;

export default function (param1) {
  console.log("Sample action");
  console.log("param1:", param1);
}
