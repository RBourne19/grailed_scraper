import React from "react";
import grailedData from "./interface";
import style from './page.module.css';

export default function Tile(data: grailedData) {
  return (
    <div className={style.tile}>
    <a href={data.grailedLink}>
      <img className={style.image}src={data.imgLink} height={320} width={240} >
      </img>
        <div className={style.price}>${data.price}</div>
        
        <div className={style.size}>{data.size}</div>
        <div className={style.titleCard}>
            <div className={style.title}>{data.title}</div>
            <div className={style.description}>{data.description}</div>
        </div>
    </a>
    </div>
  );
}
