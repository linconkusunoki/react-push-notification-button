import React from 'react'
import PushButton from '../lib'

const key =
  'BCCoifHtK8y2fzOxuYKg_ElD928RFxFjZ18xssqYwJZaR1jXo9knXve-6mnBPeZekyVVCWFplvEsgsX_6qMJFPA'

const texts = {
  notifications: 'Notificações',
  enable: 'Habilitar',
  disable: 'Desabilitar',
  blocked: 'Bloqueadas',
}

const App = () => (
  <>
    <h1>Push notification button</h1>
    <h2>Default</h2>
    <PushButton
      publicServerKey={key}
      onSubscribe={subscription => console.log(subscription)}
    />

    <h2>With custom text</h2>
    <PushButton
      publicServerKey={key}
      onSubscribe={subscription => console.log(subscription)}
      texts={texts}
    />
  </>
)

export default App
