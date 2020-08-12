const API_URL = "http://localhost:5000"

export async function LogEntries(){
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}