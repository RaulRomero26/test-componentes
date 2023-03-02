import { useEffect, useRef, useState, useCallback,useLayoutEffect } from 'react'
import Zoom from 'react-medium-image-zoom'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'



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
    
    let water='';
    (isLoaded)
        ? water = `A.R.G.O.S. `.repeat(3000) 
        : water = '';
     
    return (
        <>
        {buttonUnzoom}
    
        <figure>
            {img}
            <figcaption className={classCaption} data-watermark="A.R.G.O.S.">
            {water}
            </figcaption>
        </figure>
        </>

    )
}


export const Picture = () => {

    const imgContainerRef = useRef(null);
    const [watermark, setWatermark] = useState("watermarked");
  
    const [isZoomed, setIsZoomed] = useState(false)
  
    const handleZoomChange = useCallback(shouldZoom => {
      console.log(document.querySelectorAll('[data-rmiz-modal-content]'))
      setIsZoomed(shouldZoom)
    }, [])
  
  
    useEffect(() => {
      const imgContainerSelector = imgContainerRef.current.querySelector(".watermarked");
      console.log(imgContainerSelector)
      console.log("watermark ", watermark);
  
      if (watermark) {
        imgContainerSelector.dataset.watermark = (
          imgContainerSelector.dataset.watermark + "   "
        ).repeat(1000);
      } else {
        imgContainerSelector.dataset.watermark = "";
      }
    }, [watermark]);
  
  
  
  
    return (
        <div >
            <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} ZoomContent={CustomZoomContent}>
                <div className="card" style={{width: '25rem'}} ref={imgContainerRef}>
                        <div
                        className="watermarked" data-watermark="A.R.G.O.S."
                        aria-label="hongo"
                        role="img"
                        style={{
                            width: '23rem',
                            backgroundColor: '#fff',
                            backgroundImage: `url("http://172.18.0.25/sarai/public/files/Remisiones/21641/FotosHuellas/266182/rostro_frente.jpeg")`,
                            backgroundPosition: '50%',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '0',
                            paddingBottom: '56%',
                            margin:'auto',
                            marginTop: '10px',
                        }}
                        />
                    <div className=" card-body card-img-top" > 
                        <b>Ficha: </b> 21641
                        <b>Remision: </b> 266182
                    </div>
                </div>
            </ControlledZoom>

        </div>
    )
  }