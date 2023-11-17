import { NewsType, OppType, PartnerType } from "@/utility/types";
import { ErrorOutline } from "@mui/icons-material";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";

const headers = {"Content-Type": "application/json"}

// ------------------> Admin Auth<---------------------
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


// ------------> Emails <------------------
export async function sendWelcome (email:string) {
  try {
    const res = await fetch(`${SERVER_URL}/api/email`, { method: 'POST', headers, body:JSON.stringify({email})})
    if (res) {
      return res.json()
    }
  } catch (error) {
    return error
  }
}


// -----------------> News <-----------------
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
export async function updateNews (news:NewsType, news_id:string) {
  try {
    const res = await fetch(`${SERVER_URL}/api/news/${news_id}`, {method:'PUT', headers, body:JSON.stringify(news)})
    if (res) {
      return res.json()
    }
  } catch(error) {
    return error
  }
}
export async function deleteNews (news_id:string) {
  try {
    const res = await fetch(`${SERVER_URL}/api/news/${news_id}`, {method:'DELETE', headers, body:JSON.stringify({id:news_id})})
    if (res) {
      return res.json()
    }
  } catch(error) {
    return error
  }
}
//-----------------> Partners <----------------
export async function getPartners () {
  try {
    const res = await fetch(`${SERVER_URL}/api/partners`, {headers})
    if (res) {
      return res.json()
    }
  } catch(error) {
    return error;
  }
}
export async function AddPartners (partner:PartnerType) {
  try {
    const res = await fetch(`${SERVER_URL}/api/partners`, {method:'POST', headers, body:JSON.stringify(partner)});
    if (res) {
      return res.json()
    }

  } catch(error) {
    return error;
  }
}
export async function UpdatePartner (partner:PartnerType) {
  try {
    const res = await fetch(`${SERVER_URL}/api/partners`, {method:'PUT', headers, body:JSON.stringify(partner)})
    if (res) {
      return res.json()
    }
  }catch (error) {
    return error;
  }
}
export async function DeletePartner (id:string) {
  try {
    const res = await fetch(`${SERVER_URL}/api/partners`, {method:'DELETE', headers, body:JSON.stringify({id})})
    if (res) {
      return res.json()
    }
  } catch(error) {
    return error;
  }
}


//------------------> Opps <---------------------
export async function getOpps() {
  try {
    const res = await fetch(`${SERVER_URL}/api/opps`, {headers})
    if(res) {
      return res.json()
    }
  } catch(error) {
    return error
  }
}
export async function addOpp(newOpp : OppType) {
  try {
    const res = await fetch(`${SERVER_URL}/api/opps`, {method:'POST', headers, body:JSON.stringify(newOpp)})
    if (res) {
      return res.json()
    }
  } catch(error) {
    return error
  }
}
export async function updateOpp (partner:OppType) {
  try {
    const res = await fetch(`${SERVER_URL}/api/opps`, {method:'PUT', headers, body:JSON.stringify(partner)})
    if (res) {
      return res.json()
    }
  }catch (error) {
    return error;
  }
}
export async function deleteOpp (id:string) {
  try {
    const res = await fetch(`${SERVER_URL}/api/opps`, {method:'DELETE', headers, body:JSON.stringify({id})})
    if (res) {
      return res.json()
    }
  } catch(error) {
    return error;
  }
}