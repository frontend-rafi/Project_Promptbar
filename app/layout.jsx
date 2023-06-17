import React from 'react'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
export const metadata = {
    title:"PromptBar",
    description:"Discover & Share AI Prompts"
}

const layout = ({children}) => {
  return (
    <html lang='en' suppressHydrationWarning={true} >
      <body>
        <Provider>
          {/* bgc */}
        <div className='main '>
<div className='gradient'/>
        </div>
          {/* bgc */}
        {/* full app */}
        <main className='app'>
            <Nav/>
{children}
        </main>
         {/* full app */}
        </Provider>
      </body>
    </html>
  )
}

export default layout
