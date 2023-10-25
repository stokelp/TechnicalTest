'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Search from '@/components/search/search'
import { useEffect, useState } from 'react'

import { Band } from '@/utils/utils'
import Grid from '@/components/grid/grid'
import Card from '@/components/card/card'

export default function Home() {
  const [myBands, setMyBands] = useState<Band[]>([])
  const [cards, setCards] = useState<Array<typeof Card>>([])
  let keyId = 0

  useEffect(() => {
    let myTMPcards:any[] = []
    myBands.forEach((band: Band) => {
        myTMPcards.push(<Card key={keyId+=1} band={band} />)
    });
    setCards(myTMPcards);

}, [myBands])

  return (
    <main>
      <Search callback={setMyBands} />
      {
        cards.length === 0 ? <h1>No results</h1> : null
      }
      <Grid cards={cards} />
    </main>
  )
}
