import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
    const [link, setlink] = useState('');
    const [shorted, setshored] = useState('');
    const [history, setHistory] = useState([]);
    const sethistoryFun = () => {
        const findHistory = localStorage.getItem('history');
        if (findHistory) {
            const parseHistory = JSON.parse(findHistory)
            setHistory(parseHistory)
        } else {
            localStorage.setItem('history', '[]');
        }
    }
    const short = async () => {
        if (link) {
            const req = await axios.post('/api/createLink', { link });
            const shortedlink = "https://www.π.site/" + req.data.Shortlink;
            setshored(shortedlink);
            const getHistory = localStorage.getItem('history');
            if(getHistory){
                const historyObject =  JSON.parse(getHistory)
                const setHistoryLS = historyObject.push({ link: shortedlink, enteredLink: link })
                localStorage.setItem('history', JSON.stringify(historyObject));
                sethistoryFun();
            }
        }
    }
    const copy = (getLink) => {
        const el = document.createElement('textarea');
        el.value = getLink;
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    const remove = (num) => {
        const getHistory = localStorage.getItem('history');
        const historyObject =  JSON.parse(getHistory);
        historyObject.splice(num,1);
        localStorage.setItem('history', JSON.stringify(historyObject));
        sethistoryFun();
    }
    useEffect(() => {
        sethistoryFun();
    }, [])
    return (
        <>
            <div className="w-full min-h-[75vh] flex justify-center items-center">
                <div className="text-black w-full flex justify-center flex-col items-center">
                    <input className="rounded-3xl h-[3rem] max-sm:w-[250px] w-[500px] text-center px-2 py-2 mb-4 placeholder:text-center" type="url" name="url" placeholder="Enter link" onChange={(e) => setlink(e.target.value)} />
                    <div className="text-black cursor-pointer mt-4 tracking-wider font-bold text-lg bg-white rounded-3xl px-6 hover:bg-opacity-50" onClick={short}>Short it!</div>
                    {shorted &&
                        <div className="text-white cursor-pointer mt-3">Click to copy <span className="text-blue-400 active:text-orange-500" onClick={()=>{copy(shorted)}}>{shorted}</span> </div>}
                    <div className="text-white mt-5 text-3xl border w-[600px] text-center py-2 max-sm:w-full">
                        <h1 className="font-bold mb-5">History</h1>
                        {history.map((el, index) => (
                            <div key={index} className="flex justify-around text-start text-sm h-5 my-3 cursor-pointer">
                                <div className="px-4 font-medium text-orange-500 hover:opacity-60">{index + 1}</div>
                                <div className="px-4 w-full active:text-orange-500 truncate hover:opacity-60 active:opacity-100" onClick={()=>{copy(el.link)}}>{el.link}</div>
                                <div className="px-4  w-full truncate active:text-orange-500 hover:opacity-60 active:opacity-100" onClick={()=>{copy(el.enteredLink)}}>{el.enteredLink}</div>
                                <div className="bg-white hover:opacity-60 px-4 text-center  mx-4 text-black rounded-xl" onClick={()=>remove(index)}>remove</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;