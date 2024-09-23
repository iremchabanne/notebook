export async function register(formData) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data?.message || "Unknown error while trying to register"
      );
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function login(formData) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();
    if (response.status === 422) {
      throw new Error(data?.message || "Uknown error while log in.");
    }
    const userData = {
      id: data?.user?.id,
      email: data?.user?.email,
    };
    return userData;
  } catch (err) {
    throw new Error(err?.message);
  }
}

export async function getUserNotes() {
  try {
    const [noteData, userData] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/users/notes`, {
        credentials: "include",
      }),
      fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        credentials: "include",
      }),
    ]);

    if (!noteData || !userData) {
      throw new Error("Failed to fetch data");
    }
    const [note, user] = await Promise.all([noteData.json(), userData.json()]);
    return { note, user };
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}
