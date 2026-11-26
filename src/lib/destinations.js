const API_URL = "https://travel-agency-server-iota.vercel.app/destinations";

// Uncached on purpose: every render reads the freshest destination data.
export async function getDestinations() {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch destinations: ${response.status}`);
    }

    const result = await response.json();

    // Supports different API response structures.
    const destinations = Array.isArray(result)
      ? result
      : (result.destinations ??
        result.data?.destinations ??
        result.data ??
        result.results ??
        []);

    return Array.isArray(destinations) ? destinations : [];
  } catch (error) {
    // Prerendering aborts uncached fetches once the shell is complete —
    // let React handle that instead of falling back to empty data.
    if (error?.digest === "HANGING_PROMISE_REJECTION") throw error;

    console.error("Destination fetching error:", error);
    return [];
  }
}

// Uncached on purpose: every render reads the freshest destination data.
export async function getDestinationBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/${slug}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch destination: ${response.status}`);
    }

    const result = await response.json();

    // Supports either the destination object or a wrapped response.
    return result?.destination ?? result?.data ?? result;
  } catch (error) {
    // Prerendering aborts uncached fetches once the shell is complete —
    // let React handle that instead of falling back to a null destination.
    if (error?.digest === "HANGING_PROMISE_REJECTION") throw error;

    console.error(`Destination "${slug}" fetching error:`, error);
    return null;
  }
}

// ======== create a destination package ======
export async function createDestination(formData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.message || `Failed to create destination: ${response.status}`,
    );
  }

  return result;
}
