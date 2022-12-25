import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}
const Container = ({children}:ContainerProps) => {
  return (
    <div style={{width: '1400px', margin: '0 auto', textAlign:'center'}}>
        {children}
    </div>
  )
}

export default Container;
