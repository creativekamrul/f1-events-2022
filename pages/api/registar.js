import cookie from "cookie"
import { BACK_API_URL } from "@/config/index";
export default async (req, res) => {
  if (req.method === "POST") {
    const { email, username, password } = req.body;
    const strapiRes = await fetch(`${BACK_API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await strapiRes.json();
    if (strapiRes.ok) {
        // set the JWT as cookie
        res.setHeader("Set-Cookie", cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge:  60 * 60 * 24 * 7, // 7 days
          path: "/",
        }))
      res.status(200).json({user: data.user, jwt: data.jwt});
    }else{
        res.status(data.error.status).json({message: data.error});
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
