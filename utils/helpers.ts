export const convertURLSearchParamsToObject = (
  searchParams: URLSearchParams
) => {
  let obj: any = {};
  searchParams.forEach((value: any, key: any) => {
    obj[key] = value;
  });
  return obj;
};

export function generateRandomString(length: any) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}
