export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Sample Action",
  displayText: "Sample Action",
  description: "This is a sample action",
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

export const expose = false;

export default function (param) {
  console.log(param);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Sample Action");
      resolve();
    }, 1000);
  });
}
