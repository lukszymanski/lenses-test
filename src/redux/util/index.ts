export const objectToQuery = (
  params: Record<string, string | number | boolean>
) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    queryParams.set(key, String(value));
  });

  return queryParams.toString();
};
