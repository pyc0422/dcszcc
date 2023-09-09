const SERVER_URL = process.env.NEXT_PUBLIC_FIREBASE_SERVER || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = isJson
      ? data.message || response.statusText
      : response.statusText;
    throw new Error(message);
  }

  return data as T;
}

const headers = {"Content-Type": "application/json"}

export async function addUser (email:string) {
  console.log('email in addUser:', email, SERVER_URL)
  try {
    const res = await fetch(`${SERVER_URL}/api/users/`,{method:'POST', headers:{ "Content-Type": "application/json"}, body:email})
    if (res) {console.log('res in api.ts', res)}
    return res.json()
  } catch(error) {

  }
}