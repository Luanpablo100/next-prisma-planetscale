import Head from "next/head"

import Image from "next/image"

export default function Container({children}) {
    return (

        <>
            <Head>
                <title>Planetscale App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen font-bold text-white bg-gray-900">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center z-40">
                    {children}
                </main>
            {/* <img src="/img/2xl-moon.svg" className="w-screen h-screen absolute z-0"></img>
            <img src="/img/lg-moon.svg" className="w-screen h-screen absolute z-0 xl:hidden"></img>
            <img src="/img/md-moon.svg" className="w-screen h-screen absolute z-0 lg:hidden"></img>
            <img src="/img/sm-moon.svg" className="w-screen h-screen absolute z-0 md:hidden"></img>
            <img src="/img/xsm-moon.svg" className="w-screen h-screen absolute z-0 sm:hidden"></img> */}
            </div>
        </>
    )
}