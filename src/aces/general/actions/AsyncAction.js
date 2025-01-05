export const config = {
  highlight: true,
  deprecated: false,
  isAsync: true,
  listName: "Sample Action",
  displayText: "Sample Action",
  description: "This is a sample action",
  params: [],
};

export const expose = true;

export default async function () {
  console.log("Sample Action");
}
