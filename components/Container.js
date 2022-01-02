import Head from "next/head"


export default function Container({children}) {
    return (

        <>
            <Head>
                <title>Planetscale App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('/img/moon3.svg')] font-['Inter'] font-bold text-white">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    {children}
                </main>
            </div>
        </>
    )
}