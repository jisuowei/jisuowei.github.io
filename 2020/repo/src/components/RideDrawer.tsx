import React, { useState, useEffect } from 'react'
import { Drawer } from '@blueprintjs/core'
import { CUSTOM_MAP } from '../ts/enum'
import SVG_PIN from '../images/icon/pin.svg'

interface IRideDrawer {
  date: string
  children: React.ReactNode
}

const G: any = window
const BMap = G.BMap

export default function RideDrawer(props: IRideDrawer) {

  const { date, children } = props
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      fetch(`${process.env.REACT_APP_OSS_URL}/file/ride/${date}.json`)
        .then((response) => response.json())
        .then(function (data) {

          const map = new BMap.Map('map', { enableMapClick: false })
          const point = new BMap.Point(119.52, 32.79)
          map.addControl(new BMap.NavigationControl())
          map.centerAndZoom(point, 14)
          map.enableScrollWheelZoom()
          map.setMapStyleV2({styleJson: CUSTOM_MAP})

          const points = data.map((p: any) => {
            return new BMap.Point(p.lng, p.lat)
          })
          map.setViewport(points)

          const polyline = new BMap.Polyline(points, {
            strokeColor: '#f00',
            strokeWeight: 2, strokeOpacity: 1 
          })
          map.addOverlay(polyline)

          const size = { width: 18, height: 24 }
          const pin = new BMap.Marker(points[points.length-1], {
            offset: {
              width: 0,
              height: - size.height / 2
            },
            icon: new BMap.Icon(
              SVG_PIN,
              size,
              { imageSize: size }
            )
          })
          map.addOverlay(pin)

        })
    }
  }, [open, date])

  return (
    <>
      <Drawer
        position="left"
        style={{width: '60%', minWidth: 640}}
        isOpen={open} 
        onClose={() => { 
          setOpen(false)
        }}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0">
          <div id="map" className="absolute top-0 right-0 bottom-0 left-0" style={{border: '6px solid #fff'}} />
        </div>
      </Drawer>
      <span 
        onClick={() => {
          setOpen(true)
        }}
      >
        {children}
      </span>
    </>
  )
}
