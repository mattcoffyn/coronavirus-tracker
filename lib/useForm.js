import { useState } from "react";

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export default function useForm(initial) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    if (e.target) {
      let { value, name, type } = e.target;
      if (type === "number") {
        value = parseInt(value);
      }
      if (type === "file") {
        [value] = e.target.files;
      }
      if (type === "select-one") {
        const selectedIndex = e.target.selectedIndex;
        value = e.target[selectedIndex].id;
      }
      setInputs({
        ...inputs,
        [name]: value,
      });
    } else {
      const typeName = camelize(e.__typename);
      setInputs({
        ...inputs,
        [typeName]: e.id,
      });
    }
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ""])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
