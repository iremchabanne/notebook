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
        username: formData.get("username"),
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
      username: data?.user?.username,
      email: data?.user?.email,
    };
    return userData;
  } catch (err) {
    throw new Error(err?.message);
  }
}
