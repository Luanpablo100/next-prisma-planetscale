import Head from "next/head"

export default function Container({children}) {
    return (

        <>
            <Head>
                <title>Planetscale App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen font-bold text-white bg-gradient-to-br from-indigo-500 to-orange-500">
                <main className="flex flex-col items-center justify-center w-full flex-1 md:px-20 text-center z-40">
                    {children}
                </main>
            </div>
        </>
    )
}