import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import ConnectDB from '@/helper/mongoDB';
import shortner from '@/models/shortner';
const query = ({ link }) => {
    const router =  useRouter();
    useEffect(()=>{
        if(link){
        router.push(`${link}`);
    }
    },[])
    return (
        <div className='m-3 text-xl'>
            Redirecting...
        </div>
    )
}
export async function getServerSideProps(context) {
    const Shortlink = context.query.slug;
    await ConnectDB();
    const find = await shortner.findOne({ Shortlink });
    let link = '';
    if (find) {
        link = find.link;
    }
    return {
        props: { link }
    }
}
export default query