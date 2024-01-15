import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Home = () => {
    const [link, setlink] = useState('');
    const [shorted,setshored]=useState('');
    const short = async () => {
        if (link) {
            const req = await axios.post('/api/createLink', { link });
            const shortedlink = "https://www.π.site/s/"+req.data.Shortlink;
            setshored(shortedlink);
        }
    }
    const copy = () => {
        const el = document.createElement('textarea');
        el.value = shorted;
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    return (
        <>
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="text-black w-full flex justify-center flex-col items-center">
                <input className="rounded-3xl h-[3rem] min-w-[50%] max-w-[60%] text-center px-2 py-2 mb-4 placeholder:text-center" type="url" name="url" placeholder="Enter link" onChange={(e) => setlink(e.target.value)}/>
                <div className="text-black cursor-pointer mt-4 text-lg bg-white rounded-3xl px-6 hover:bg-opacity-50" onClick={short}>Short Again</div>
                {shorted &&
                <div className="text-white cursor-pointer mt-3">Click to copy <span className="text-blue-400 hover:text-blue-800" onClick={copy}>{shorted}</span> </div>}
            </div>
            </div>
        </>
    )
}

export default Home;