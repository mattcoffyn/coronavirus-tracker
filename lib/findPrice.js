export function findPrice(matrix, quantity) {
  let foundPrice;

  matrix.map((row) => {
    if (quantity >= row[0]) {
      foundPrice = row[0];
    }
    return;
  });
  console.log(foundPrice);
}
