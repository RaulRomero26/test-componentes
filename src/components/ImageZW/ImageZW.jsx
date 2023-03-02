import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import '../../assets/css/ImageZW/imagen.css'

export const ImageZW = () => {

  const imgContainerRef = useRef(null);
  const [watermark, setWatermark] = useState("watermarked");

  const [isZoomed, setIsZoomed] = useState(false)

  const handleZoomChange = useCallback(shouldZoom => {
    console.log(document.querySelectorAll('[data-rmiz-modal-content]'))
    document.querySelectorAll('[data-rmiz-modal-content]')[0].classList.add('rojo')
    document.querySelectorAll('[data-rmiz-modal-img]')[0].style.display='none';
    let div = document.createElement("div");
    div.style.backgroundImage= `url("https://source.unsplash.com/Dm-qxdynoEc/800x799")`,
    div.style.height= '800px'
    div.style.zIndex= '999'
    document.querySelectorAll('[data-rmiz-modal-content]')[0].append(div)
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
      ).repeat(300);
    } else {
      imgContainerSelector.dataset.watermark = "";
    }
  }, [watermark]);




  return (
    <div ref={imgContainerRef}>

      {/* <div className="watermarked" data-watermark="watermark.com" > */}
      <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} >
          {/* <img  
                src="https://source.unsplash.com/Dm-qxdynoEc/800x799"
                alt="mushroom"
                style={{width: '500px'}}
              /> */}
              <div
                className="watermarked" data-watermark="A.R.G.O.S."
                aria-label="hongo"
                role="img"
                style={{
                  width: '500px',
                  backgroundColor: '#fff',
                  backgroundImage: `url("https://source.unsplash.com/Dm-qxdynoEc/800x799")`,
                  backgroundPosition: '50%',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  height: '0',
                  paddingBottom: '56%',
                  // width: '100%',
                }}
              />

        </ControlledZoom>
      {/* </div> */}
    </div>
  )
}
