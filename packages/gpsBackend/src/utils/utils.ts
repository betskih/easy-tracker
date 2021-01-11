const rad = 6372795;

export const distance = (llat1, llong1, llat2, llong2) => {
  const lat1 = (llat1 * Math.PI) / 180;
  const lat2 = (llat2 * Math.PI) / 180;
  const long1 = (llong1 * Math.PI) / 180;
  const long2 = (llong2 * Math.PI) / 180;

  const cl1 = Math.cos(lat1);
  const cl2 = Math.cos(lat2);
  const sl1 = Math.sin(lat1);
  const sl2 = Math.sin(lat2);
  const delta = long2 - long1;
  const cdelta = Math.cos(delta);
  const sdelta = Math.sin(delta);

  const y = Math.sqrt((cl2 * sdelta) ** 2 + (cl1 * sl2 - sl1 * cl2 * cdelta) ** 2);
  const x = sl1 * sl2 + cl1 * cl2 * cdelta;
  const ad = Math.atan2(y, x);
  return ad * rad;
};
