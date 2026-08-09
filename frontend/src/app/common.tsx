export async function checkSession(): Promise<boolean> {
    try {
        const response = await fetch(
            "http://localhost:8000/api/check-session.php",
            {
                credentials: "include",
            }
        );

        const result = await response.json();

        return result.loggedIn;

    } catch (error) {
        console.error("Session check error:", error);
        return false;
    }
}