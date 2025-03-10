
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/details.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const postData = async (endpoint, data) => {
  try {
    await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/details.json", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
