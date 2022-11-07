import React, { useState } from 'react'
import styles from './Swipe.module.scss'
import { Swipe as Swiper } from "react-swipe-component/lib/index"


export function Swipe({ MainElem, HiddenElem }) {

    if (!MainElem) return

    const [optionsShown, setOptionsShown] = useState(false)


    const showOptions = () => {
        console.log('show')
        setOptionsShown(true)
    }

    const hideOptions = () => {
        console.log('hide')
        setOptionsShown(false)

    }
    return (
        <div className={styles.Container}>
            <Swiper node="div" className={styles.Swiper} onSwipedLeft={() => showOptions()} onSwipedRight={() => hideOptions()} detectTouch>
                <MainElem />
            </Swiper>
            {optionsShown && <div className={styles.Options}>
                <HiddenElem />
            </div>}

        </div>
    )
}