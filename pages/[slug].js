import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ConnectDB from '@/helper/mongoDB';
import shortner from '@/models/shortner';
const query = ({ data }) => {
    const [text, settext] = useState('Redirecting...');
    const router = useRouter();

    const set = () =>{
        if (data.status) {
            const link = data.link;
            link.toLowerCase();
            if (link.startsWith('https') || link.startsWith('http')) {
                if (link) {
                    setTimeout(() => {
                        router.push(`${link}`);
                    }, 600);
                }
                else {
                    settext('Invalid link');
                }
            }
            else {
                setTimeout(() => {
                    router.push(`http://${link}`);
                }, 600);
            }
        }
        else {
        }
    }
    useEffect(()=>{
        set()
        return set()
    },[])
        return (
        <div className='w-full min-h-screen'>
            {data.status ?
                <div className='m-3 text-xl text-stone-50'>
                    Link opened for {data.count + 1} times,  {text}
                </div>
                :
                <div className='m-3 text-xl text-stone-50'>
                    Invalid link
                </div>
            }
        </div>
    )
}
export async function getServerSideProps(context) {
    const Shortlink = context.query.slug;
    await ConnectDB();
    const find = await shortner.findOne({ Shortlink });
    await shortner.updateOne({ Shortlink }, { $inc: { count: 1 },$push:{openedBy:context.req.headers} });
    let link = '';
    if (find) {
        link = find.link;
        const data = { link, count: find.count, status: true };
        return {
            props: { data }
        }
    }
    const data = {status:false}
    return { props: { data } };
}
export default query