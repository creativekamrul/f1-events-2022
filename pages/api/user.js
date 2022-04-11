
import cookie from "cookie"
import { BACK_API_URL } from "@/config/index";
export default async (req, res) => {
  if (req.method === "GET") {
    if(!req.headers.cookie){
      res.status(401).json({message: "No token found"});
      return
    }
    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${BACK_API_URL}/api/users/me`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },

    })
    const data = await strapiRes.json();
    if (strapiRes.ok) {
        res.status(200).json({user: data, jwt: token});
    }else{
        res.status(403).json({message: "Forbidden User"});
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
