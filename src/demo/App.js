import React from 'react'
import PushButton from '../lib'

const key =
  'BLPyHSf-fnxkd88aNF2uR7-uv_DdRryaQxCQxMezwVJiiHFY5VBmvPCZU4LS0KUUyfmvypD0L2bsSF532dd9kfQ'

const texts = {
  notifications: 'Notificações',
  enable: 'Habilitar',
  disable: 'Desabilitar',
  blocked: 'Bloqueadas',
}

const style = { border: '2px solid purple', display: 'block', margin: 10 }

const App = () => (
  <>
    <h1>Push notification button</h1>
    <h2>Default</h2>
    <PushButton
      publicServerKey={key}
      onSubscribe={subscription => console.log(subscription)}
      onUnsubscribe={subscription => console.log(subscription)}
    />

    <h2>With custom text</h2>
    <PushButton
      publicServerKey={key}
      onSubscribe={subscription => console.log(subscription)}
      texts={texts}
    />

    <h2>With custom component</h2>
    <PushButton
      publicServerKey={key}
      onSubscribe={subscription => console.log(subscription)}
      component={CustomComponent}
    />
    <PushButton
      publicServerKey={key}
      onSubscribe={subscription => console.log(subscription)}
      component={CustomComponent}
      texts={texts}
    />
  </>
)

const CustomComponent = ({ children }) => {
  return <button style={style}>{children}</button>
}

export default App
