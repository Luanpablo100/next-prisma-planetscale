import Link from 'next/link'
import Container from '../components/Container'

import Image from 'next/image'

export default function Home() {
  return (
    <Container>
        <p>An Next app with</p>
        <Image src={'/img/planetscale.svg'} width={300} height={300}/>
        <h1 className='text-4xl'>The most scalable MySQL platform!</h1>
        <div className='mt-5'>
          <Link href={'/tasklist'}>
            <button className='bg-indigo-700 px-8 py-3 rounded-md shadow border-2 border-white hover:bg-indigo-800'>Try it now!</button>
          </Link>
          <p className='mt-2'>With a tasklist app</p>
        </div>
    </Container>

  )
}
