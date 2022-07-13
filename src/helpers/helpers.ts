export const setBGColor = (temp: number) => {
  const t1 = ((temp / 10) % 1) * 50;
  let color = 0;
  if (temp) {
    if (temp > 0 && temp < 10) {
      color = 250;
    } else if (temp >= 10 && temp < 20) {
      color = 200;
    } else if (temp >= 20 && temp < 30) {
      color = 150;
    } else if (temp >= 30 && temp < 40) {
      color = 100;
    } else if (temp >= 40) {
      color = 50;
    }
    return temp > 0 ? `rgba(255, ${color - t1}, 0, 0.3)` : `rgba(0, ${color - t1 - 100}, 255, 0.3)`;
  }
};

type Callback = (...args: string[]) => void;

export const debounce = (fn: Callback, ms: number) => {
  let timeout: NodeJS.Timeout;
  return function (...args: string[]) {
    function fnCall() {
      fn.apply(this, [...args]);
    }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

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
