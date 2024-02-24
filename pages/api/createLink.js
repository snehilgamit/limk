import ConnectDB from "@/helper/mongoDB";
import shortner from "@/models/shortner";

export default async function handler(req, res) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    if (req.method === 'POST') {
        await ConnectDB();
        const { link, username } = req.body;
        if (link.toString().trim().length !== 0) {
            let Shortlink = generateString(6);
            let findDublicate = await shortner.find({ Shortlink });

            while (!findDublicate) {
                Shortlink = generateString(6);
                findDublicate = await shortner.find({ Shortlink });
            }
            const upload = await shortner.create({ link, Shortlink, username });
            return res.json({ Shortlink });
        }
        return res.json({ err: "provide link" });
    }
    return res.json({ err: "Invalid request" });
}