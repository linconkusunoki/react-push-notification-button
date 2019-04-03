import React from 'react'
import PushButton from '../lib'

const key =
  'BCCoifHtK8y2fzOxuYKg_ElD928RFxFjZ18xssqYwJZaR1jXo9knXve-6mnBPeZekyVVCWFplvEsgsX_6qMJFPA'

const App = () => (
  <PushButton
    publicServerKey={key}
    onSubscribe={subscription => console.log(subscription)}
  />
)

export default App
