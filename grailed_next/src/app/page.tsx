import Image from 'next/image'
import style from './page.module.css'
import grailedData from './interface'
import Tile from './Tile'
import { useState } from 'react'
import getIntitialData from './IntitialFetch'



export default async function Home() {
  const initial:grailedData[] = await getIntitialData();
  
  console.log(initial[0])

  return (
    <main>
      <div className={style.mainContainer}>
        {initial.map((d:grailedData) => (
           <Tile {...d}></Tile>
        ))}
      </div>
    </main>
  );
};
