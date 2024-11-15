export const fetchAllData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_NODE_URL}`, {
    cache: "no-store",
  });
  return await response.json();
};
