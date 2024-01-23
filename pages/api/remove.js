import ConnectDB from "@/helper/mongoDB";
import shortner from "@/models/shortner";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await ConnectDB();
        const { link, username } = req.body;
        console.log(link, username)
        if (link && username) {
            const getLink = await shortner.findOne({ Shortlink: link, username });
            if (getLink) {
                await shortner.deleteOne({ Shortlink: link, username })
                return res.json({ status: true, message: "deleted" });
            }
            return res.json({ err: "Invalid link or user" })
        }
        return res.json({ err: "Invalid link or user" })
    }
    return res.json({ err: "Invalid request" });
}