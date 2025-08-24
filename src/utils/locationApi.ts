export const fetchLocationFromPincode = async (pincode: string) => {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();

    if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
      const {State, District, Country} = data[0].PostOffice[0];
      return {state: State, district: District, country: Country};
    } else {
      throw new Error("Invalid pincode or no data found");
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};