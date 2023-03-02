import { useEffect, useRef, useState, useCallback } from 'react'
import { useLayoutEffect } from 'react'

// import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import '../../assets/css/ImageZW/imagen.css'


const CustomZoomContent = ({buttonUnzoom,modalState,img}) => {
    const [isLoaded, setIsLoaded] = useState(false)

    useLayoutEffect(() => {
    if (modalState === 'LOADED') {
        setIsLoaded(true)
    } else if (modalState === 'UNLOADING') {
        setIsLoaded(false)
    }
    }, [modalState])

    const classCaption = isLoaded
    ? 'zoom-caption zoom-caption--loaded'
    : 'zoom-caption'

    let water= `A.R.G.O.S. `.repeat(3000);
    return (
        <>
        {buttonUnzoom}
    
        <figure>
            {img}
            <figcaption className={classCaption} data-watermark="A.R.G.O.S.">
            {water}
            <cite className="zoom-caption-cite">
                Wikipedia, <a className="zoom-caption-link" href="https://en.wikipedia.org/wiki/That_Wanaka_Tree">
                That Wanaka Tree
                </a>
            </cite>
            </figcaption>
        </figure>
        </>

    )
}


export const ImageCaption = () => (
    <Zoom ZoomContent={CustomZoomContent}>
      <img
        alt="That Wanaka Tree, New Zealand by Laura Smetsers"
        src="https://source.unsplash.com/Dm-qxdynoEc/800x799"
        width="500"
      />
    </Zoom>
  )
  
