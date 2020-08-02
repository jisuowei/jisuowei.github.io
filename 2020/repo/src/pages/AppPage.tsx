import React, { useState, useEffect } from 'react'
import Centainer from '../components/layout/Centainer'
import Loading from '../components/Loading'
import Jitem, { JitemProps } from '../components/Jitem'
import API from '../api'
// import AppWindow from '../components/AppWindow'

function AppPage(props: any) {

  // const appName = props.match.params.name

  const [res, setRes] = useState<any>([])
  const apps = res.rows || []
  // const [appWindowUrl, setAppWindowUrl] = useState('')
  
  useEffect( () => {
    API.fetch('apps', {name: ''}, setRes)
  }, [])

  // useEffect(() => {
  //   if (apps.length && appName) {
  //     const app = apps.filter((app: any) => app.name === appName)[0]
  //     app && setAppWindowUrl(`http://jisuowei.com/i/${app.url}`)
  //   }
  // }, [apps, appName])

  return (
    <>
      <Centainer>
        <div className="flex flex-wrap justify-between min-h-320">
          {
            apps.length === 0
              ? <Loading isLoading={true} />
              : (
                <>
                  {
                    apps.map( ( app: JitemProps ) => (
                      <Jitem key={app.id} {...app} />
                    ))
                  }
                </>
              )
          }
        </div>
        {/* <AppWindow
          url={appWindowUrl}
          setAppWindowUrl={setAppWindowUrl}
        /> */}
      </Centainer>
    </>
  )
}

export default AppPage