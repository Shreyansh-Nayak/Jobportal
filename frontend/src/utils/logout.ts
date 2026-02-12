export const logout = async () => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include", // IMPORTANT: allows cookie clearing
    });
  } catch (err) {
    console.error("Logout request failed", err);
  } finally {
    // Clear client-side auth
    localStorage.removeItem("token");

    // Optional: clear any role-related temp data
    localStorage.removeItem("pending_role");

    // Redirect to auth page
    window.location.href = "/auth";
  }
};
