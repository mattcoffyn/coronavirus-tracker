import { useState } from 'react';

// function camelize(str) {
//   return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
//     if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
//     return index === 0 ? match.toLowerCase() : match.toUpperCase();
//   });
// }

export default function useLineItem(initial) {
  const [inputs, setInputs] = useState(initial);

  function handleNewLineItem() {
    console.log('Creating new line...');
    setInputs([...inputs, {}]);
  }

  function handleInitialProduct(item) {
    const parsedMatrix = JSON.parse(item.priceMatrix);
    setInputs([
      ...inputs,
      {
        productData: item,
        item: item.id,
        priceMatrix: parsedMatrix,
        minQty: parsedMatrix[1][0],
        quantity: parsedMatrix[1][0],
        unitRate: parsedMatrix[1][1] / 1.2,
        exVatTotal:
          Math.round(
            ((parsedMatrix[1][0] * parsedMatrix[1][1]) / 1.2 + Number.EPSILON) *
              100
          ) / 100,
        total:
          Math.round(
            (parsedMatrix[1][0] * parsedMatrix[1][1] + Number.EPSILON) * 100
          ) / 100,
      },
    ]);
    console.log('Handled Initial Properties');
  }

  function handleQuantity(e) {
    // let { value, name } = e.target;
    // value = parseInt(value);

    // if (name === 'quantity') {
    //   let unitRate = inputs.unitRate;
    //   inputs.priceMatrix.map((row) => {
    //     if (value >= row[0]) {
    //       unitRate = row[1] / 1.2;
    //     }
    //   });
    //   setInputs({
    //     ...inputs,
    //     quantity: value,
    //     unitRate: unitRate,
    //     exVatTotal: Math.round((value * unitRate + Number.EPSILON) * 100) / 100,
    //     total:
    //       Math.round((value * unitRate * 1.2 + Number.EPSILON) * 100) / 100,
    //   });
    // }
    console.log('handle Quantity');
  }

  function handleChange(e) {
    // let { value, name, type } = e.target;
    // if (type === 'number') {
    //   value = parseInt(value);
    // }
    // if (type === 'file') {
    //   [value] = e.target.files;
    // }
    // if (type === 'select-one') {
    //   const selectedIndex = e.target.selectedIndex;
    //   value = e.target[selectedIndex].id;
    // }
    // setInputs({
    //   ...inputs,
    //   [name]: value,
    // });
    console.log('handle Change');
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleNewLineItem,
    handleInitialProduct,
    handleChange,
    handleQuantity,
    resetForm,
    clearForm,
  };
}
