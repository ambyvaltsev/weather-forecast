



export const formatter = (day: string): string => {
  const today = new Date()
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .split("/")
    .reverse()
    .join("-");
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .split("/")
    .reverse()
    .join("-");

  return day === "Today" ? today : tomorrow;
};
