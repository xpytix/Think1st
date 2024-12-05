const API_URL =
  "https://api.api-ninjas.com/v1/holidays?country=PL&year=2024&type=NATIONAL_HOLIDAY";

const API_KEY = "/XoT+s+BZNUIfwkvWwYkMw==4AOMinVsSeJXRhPT";

export interface Holiday {
  date: string;
  name: string;
}

export const getHolidays = async (): Promise<Holiday[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error while fetching holidays:", error);
    throw error;
  } finally {
    console.log(
      "Request to fetch holidays completed (either successfully or with error)."
    );
  }
};

export const submitForm = async (formData: Record<string, any>) => {
  const endpoint = "http://letsworkout.pl/submit";

  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (
        value instanceof File ||
        typeof value === "string" ||
        typeof value === "number"
      ) {
        data.append(key, value as any);
      }
    });

    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Failed to submit form: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};
