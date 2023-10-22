import { NewsType } from "@/utility/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";

// async function handleResponse<T>(response: Response): Promise<T> {
//   const contentType = response.headers.get("Content-Type") || "";
//   const isJson = contentType.includes("application/json");
//   const data = isJson ? await response.json() : await response.text();
//   if (!response.ok) {
//     const message = isJson
//       ? data.message || response.statusText
//       : response.statusText;
//     throw new Error(message);
//   }

//   return data as T;
// }

const headers = {"Content-Type": "application/json"}

export async function addUser (email:string) {
  // console.log('email in addUser:', email, SERVER_URL)
  try {
    const res = await fetch(`${SERVER_URL}/api/users/`,{method:'POST', headers:{ "Content-Type": "application/json"}, body:JSON.stringify({email})})
    if (res) {
     return res.json()
    }

  } catch(error) {
    return error
  }
}

export async function sendWelcome (email:string) {
  try {
    const res = await fetch(`${SERVER_URL}/api/email`, { method: 'POST', headers, body:JSON.stringify({email})})
    if (res) {
      // console.log('res in sendWelcome', res)
      return res.json()
    }
  } catch (error) {
    return error
  }
}

export async function logIn (email:string, password: string) {
  try {
    const res = await fetch(`${SERVER_URL}/api/auth/login`, {method:'POST', headers, body:JSON.stringify({email, password})})
    if (res) {
      return res.json()
    }
  }catch(error) {
    return error
  }
}

export async function logOut () {
  try {
    const res = await fetch(`${SERVER_URL}/api/auth/logout`, {headers})
    if (res.status === 200) {
      return 'logout'
    }
  } catch(error) {
    throw error
  }
}

export async function addNews (new_news:NewsType) {
  try {
    const res = await fetch(`${SERVER_URL}/api/news/all`, {method:'POST', headers, body:JSON.stringify(new_news)})
    if (res) {
      return res.json()
    }
  } catch(error) {
    return error
  }
}

export async function getAllNews () {
  try {
    const res = await fetch(`${SERVER_URL}/api/news/all`, {headers})
    if (res) {
      return res.json()
    }
  } catch(error) {
    return error
  }
}

export async function getOneNews (news_id:string) {
  try {
    const res = await(fetch(`${SERVER_URL}/api/news/${news_id}`, {headers}))
    if (res) {
      return res.json()
    }
  }catch(error) {
    return error
  }
}