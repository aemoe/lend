import React, { useEffect, useState } from 'react';

import styles from './footer.module.css';
import { HuLogo, ImmunefiLogo } from "../../public/huIcons/huIcons"

import discord from '../../public/icons/discord.png'
import medium from '../../public/icons/medium.png'
import twitter from '../../public/icons/twitter.png'

interface Props{
    isMobile: boolean,
    darkMode: boolean
}

const Footer : React.FC<Props> = ({isMobile, darkMode} : Props) => {
    const [scale, setScale] = useState<boolean>(false)

    useEffect(() => {
        if (document.documentElement.clientWidth < 331){
          setScale(true)
        }
        else setScale(false)
    
        window.addEventListener('resize', ()=>{
          if (document.documentElement.clientWidth < 330){
            setScale(true)
          }
          else setScale(false)
        });
      }, [])

    return (
        <div className={styles.footer}>
            <div className={styles.footer_content}>
                <div className={styles.footer_logo}>
                    <HuLogo size={isMobile ? "60px" : "80px"} darkMode={darkMode}/>
                    <span className={styles.footer_content_inc}> 2022 Hundred, Inc.</span>
                </div>
                <div className={styles.footer_navbar}>
                    <a className={styles.footer_link_item} href='https://snapshot.org/#/hundredfinance.eth' target="_blank" rel="noopener noreferrer">Governance</a>
                    <a className={styles.footer_link_item} href="https://github.com/chainsulting/Smart-Contract-Security-Audits/blob/master/Percent%20Finance/02_Smart%20Contract%20Audit%20Percent%20Finance.pdf"
                        target="_blank"
                        rel="noopener noreferrer">Audit</a>
                    <a className={styles.footer_link_item} href='https://github.com/hundred-finance' target="_blank" rel="noreferrer">Github</a>
                    <a className={styles.footer_link_item} href='https://migration.hundred.finance' target="_blank" rel="noreferrer">Migration</a>
                </div>
                <div className={styles.footer_right}>
                    <a href='https://blog.hundred.finance' target="_blank" rel="noreferrer">
                        <img alt="Medium Icon" src={medium} className={styles.footer_image} />
                    </a>
                    <a href='https://discord.gg/phK668J6dQ' target="_blank" rel="noreferrer">
                        <img alt="Discord Icon" src={discord} className={styles.footer_image} />
                    </a>
                    <a href='https://twitter.com/HundredFinance' target="_blank" rel="noreferrer">
                        <img alt="Github Icon" src={twitter} className={styles.footer_image} />
                    </a>
                    <a href='https://immunefi.com/bounty/hundred-finance/' target="_blank" rel='noreferrer'>
                        <ImmunefiLogo darkMode={darkMode} isMobile={scale}/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
