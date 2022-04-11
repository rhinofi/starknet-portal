import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const NoMatch: FunctionComponent = () => {
  return (
    <div>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default NoMatch
