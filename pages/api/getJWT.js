// eslint-disable-next-line import/no-anonymous-default-export
import cookie from "cookie"
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "GET") {
    if(!req.headers.cookie){
      res.status(401).json({message: "No token found"});
      return
    }
    const { token } = cookie.parse(req.headers.cookie);

    const data = await strapiRes.json();
    if (token) {
        res.status(200).json({token: token});
    }else{
        res.status(403).json({message: "Token Not Found"});
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
