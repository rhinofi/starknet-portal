import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

export const NoMatch: FunctionComponent = () => {
  return (
    <div>
      <Link to="/">Go home</Link>
    </div>
  )
}
