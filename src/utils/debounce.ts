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