import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
    const [link, setlink] = useState('');
    const [username,setUsername]=useState('')
    const [shorted, setshorted] = useState('');
    const [history, setHistory] = useState([]);
    const [text, setText] = useState('Short it!')
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
        setshorted('')
        setText('Shorting')
        if (link) {
            const req = await axios.post('/api/createLink', { link,username });
            const shortedlink = "https://limk.vercel.app/" + req.data.Shortlink;
            setshorted(shortedlink);
            setTimeout(() => {
                setText('Short it!')
            }, 800)
            setlink('');
            setText("Done");
            const getHistory = localStorage.getItem('history');
            if (getHistory) {
                const historyObject = JSON.parse(getHistory)
                const setHistoryLS = historyObject.push({ link: shortedlink, enteredLink: link })
                localStorage.setItem('history', JSON.stringify(historyObject));
                sethistoryFun();
            }
        }
        else {
            setTimeout(() => {
                setText("Short it")
            }, 800)
            setlink('');
            setText("Error");
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
    const remove = async (num) => {
        const getHistory = localStorage.getItem('history');
        const historyObject = JSON.parse(getHistory);
        const username = localStorage.getItem('user');
        if(username){
            const link = history[num].link.split("/").at(-1);
            const deleteHistory = axios.post('/api/remove',{username,link});
        }
        historyObject.splice(num, 1);
        localStorage.setItem('history', JSON.stringify(historyObject));

        // let i = 0;
        // let lastNode = document.querySelectorAll('.history')[num];
        // const anniInterval = setInterval(()=>{
        //     if(i>=150){
        //         clearInterval(anniInterval);
        //         lastNode.style.filter='blur(0px)';
        //         sethistoryFun();
        //     }
        //     else{
        //         lastNode.style.filter=`blur(${i}px)`
        //         i++;
        //     }
        // },2)
        sethistoryFun();
    }
    const generateUsername = () => {
        let str = 'qwertyuiopasdfghjklzxcvbnm';
        let username = '';
        let i = 0;
        while(i<=63){
            username += str[Math.floor(Math.random()*(str.length-1))];
            i++;
        }
        return username;
    }
    const setUser = () => {
        const getUser = localStorage.getItem('user');
        if(getUser){
            setUsername(getUser);
        }
        else{
            const username = generateUsername();
            localStorage.setItem('user',username);
            setUsername(username);

        }
    }
    useEffect(() => {
        sethistoryFun();
        setUser();
    }, [])
    return (
        <>
            <div className="w-full selection:bg-red-600 flex justify-center items-center overflow-hidden">
                <div className="text-black mt-[10rem] mb-20 w-full flex justify-center flex-col items-center">
                    <input className="rounded-3xl h-[3rem] max-sm:w-[250px] w-[500px] text-center px-2 py-2 mb-4 placeholder:text-center" type="url" name="url" placeholder="Enter link" onChange={(e) => setlink(e.target.value)} onClick={() => { setshorted('') }} value={link} />
                    <div className="text-black cursor-pointer mt-4 tracking-wider font-bold text-lg bg-white rounded-3xl px-6 hover:bg-opacity-50" onClick={short}>{text}</div>
                    {shorted ? <div className="text-white cursor-pointer mt-3 active:text-red-600 font-semibold" onClick={() => { copy(shorted) }}><span className="text-red-600 text-xl font-extrabold">{'< '}</span>
                    <span className="shortedLink" >{shorted}</span>
                    <span className="text-red-600 font-extrabold text-xl">{' />'}</span> </div> :
                        <div className="text-white cursor-pointer mt-3 font-semibold"><span className="text-red-600 text-xl font-extrabold">{'< '}</span>Click on any link it will be copied<span className="text-red-600 font-extrabold text-xl">{' />'}</span></div>}
                    <div  className="text-white mt-5 text-3xl w-[600px] text-center py-2 max-sm:w-full">
                        <h1 className="font-bold mb-5">History</h1>
                        {history.map((el,index) => (
                            <div key={el} className="history flex justify-around text-start text-sm h-5 my-3 cursor-pointer">
                                <div className="px-4 font-medium text-red-600 hover:opacity-60">{index + 1}</div>
                                <div className="px-4 w-full active:text-red-600 truncate hover:opacity-60 active:opacity-100" onClick={() => { copy(el.link) }}>{el.link}</div>
                                <div className="px-4  w-full truncate active:text-red-600 hover:opacity-60 active:opacity-100" onClick={() => { copy(el.enteredLink) }}>{el.enteredLink}</div>
                                <div className="removeBtn bg-white hover:opacity-60 px-4 text-center  mx-4 text-black rounded-xl" onClick={() => remove(index)}>remove</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;






