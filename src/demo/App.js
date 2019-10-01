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

const previewOptions = {
  title: 'Alert',
  options: {
    icon: 'https://i.ibb.co/vdqKGrC/custom-nofitication.png',
    badge: 'https://i.ibb.co/CHF5MMp/badge.png',
    body: 'Hurry, Gotham is in danger!',
  },
}

const style = { border: '2px solid purple', display: 'block' }

const App = () => (
  <>
    <h1>Push notification button</h1>
    <hr />
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

    <h2>With custom component and text</h2>
    <PushButton
      publicServerKey={key}
      onSubscribe={subscription => console.log(subscription)}
      component={CustomComponent}
      texts={texts}
    />

    <h2>With default notification preview</h2>
    <PushButton
      publicServerKey={key}
      onSubscribe={subscription => console.log(subscription)}
      onUnsubscribe={subscription => console.log(subscription)}
      preview
    />

    <h2>With custom notification preview</h2>
    <PushButton
      publicServerKey={key}
      onSubscribe={subscription => console.log(subscription)}
      onUnsubscribe={subscription => console.log(subscription)}
      preview
      previewOptions={previewOptions}
    />

    <h2>Push button state</h2>
    <PushButton
      publicServerKey={key}
      permissionState={state => console.log(state)}
    />
  </>
)

const CustomComponent = ({ children }) => {
  return <button style={style}>{children}</button>
}

export default App
