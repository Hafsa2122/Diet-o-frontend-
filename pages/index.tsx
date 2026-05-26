import React from 'react'
import Head from 'next/head'
import Hero from '../src/components/Hero'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Diet-o — Premium Food</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Hero />
    </>
  )
}

export default Home
