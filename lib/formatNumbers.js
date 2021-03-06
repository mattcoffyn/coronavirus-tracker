export function formatSO(num) {
  let so = num + "";
  while (so.length < 5) so = "0" + so;
  return "SO" + so;
}

export function formatWO(num) {
  let wo = num + "";
  while (wo.length < 5) wo = "0" + wo;
  return "WO" + wo;
}

export function formatMoneyfromPence(amount) {
  const options = {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  // if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat("en-GB", options);
  return formatter.format(amount / 100);
  // return formatter.format(amount);
}

export function formatMoneyfromWhole(amount) {
  const options = {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  // if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat("en-GB", options);
  return formatter.format(amount);
}
