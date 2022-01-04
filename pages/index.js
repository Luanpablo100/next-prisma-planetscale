import Link from 'next/link'
import Container from '../components/Container'

import Image from 'next/image'

export default function Home() {
  return (
    <Container>
        <p>Um app Next com</p>
        <Image src={'/img/planetscale.svg'} width={300} height={300}/>
        <h1 className='text-4xl'>A plataforma SQL mais escalável!</h1>
        <div className='mt-5'>
          <Link href={'/tasklist'}>
            <button className='bg-indigo-700 px-8 py-3 rounded-md shadow border-2 border-white hover:bg-indigo-800 animate-bounce'>Experimente!</button>
          </Link>
          <p className='mt-2'>Com um app de tarefas</p>
        </div>
    </Container>

  )
}
