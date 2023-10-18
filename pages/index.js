import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Home = () => {
    const router = useRouter();
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
        <div className="gap-3 cursor-pointer"><div className="px-2 bg-white" onClick={()=>{router.push('/main.docx')}}>DBMS</div>
            <div className="px-2 bg-white" onClick={()=>{router.push('/7.docx')}}>7 practical</div>
            <div className="px-2 bg-white" onClick={()=>{router.push('/8.docx')}}>8 practical</div>
            <div className="px-2 bg-white" onClick={()=>{router.push('/9.docx')}}>9 practical</div></div>
        <div className="w-full min-h-screen bg-white bg-opacity-10 flex justify-center items-center">

            
            <div className="text-black flex justify-center flex-col items-center">
                <input className="rounded-3xl h-[2rem] w-64 px-2" type="url" name="url" placeholder="Enter link" onChange={(e) => setlink(e.target.value)}/>
                <div className="text-black mt-4 text-lg bg-white rounded-3xl px-6 hover:bg-opacity-50" onClick={short}>short it</div>
                {shorted &&
                <div className="text-white mt-3">Click to copy <span className="text-blue-400 hover:text-blue-800" onClick={copy}>{shorted}</span> </div>}
            </div>
            </div>
        </>
    )
}

export default Home;