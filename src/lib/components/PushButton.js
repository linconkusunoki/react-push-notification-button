import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const PushButton = ({
  publicServerKey,
  onSubscribe,
  onUnsubscribe,
  permissionState,
  texts,
  preview,
  previewOptions,
  component: Component,
  ...props
}) => {
  const [subscription, setSubscription] = useState(null)

  const handleClick = () => {
    if (subscription) {
      unsubscribeUser(setSubscription, onUnsubscribe)
    } else {
      subscribeUser(
        setSubscription,
        onSubscribe,
        publicServerKey,
        preview,
        previewOptions
      )
    }
  }

  useEffect(() => {
    checkSubscription(setSubscription)
  }, [])

  useEffect(() => {
    permissionState(Notification.permission)
  }, [Notification.permission])

  if (Notification.permission === 'denied') {
    return (
      <Component {...props} disabled={true}>
        {texts.notifications} {texts.blocked}
      </Component>
    )
  }

  return (
    <Component {...props} onClick={handleClick}>
      {subscription ? texts.disable : texts.enable} {texts.notifications}
    </Component>
  )
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function checkSubscription(setSubscription) {
  navigator.serviceWorker.ready.then(registration => {
    registration.pushManager.getSubscription().then(subscription => {
      if (subscription) setSubscription(subscription)
    })
  })
}

function subscribeUser(
  setSubscription,
  onSubscribe,
  publicServerKey,
  preview,
  previewOptions
) {
  const applicationServerKey = urlB64ToUint8Array(publicServerKey)
  return navigator.serviceWorker.ready.then(registration => {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      })
      .then(sub => {
        if (preview) {
          const title = previewOptions.title
          const options = previewOptions.options
          new Notification(title, options)
        }

        const subscription = JSON.stringify(sub)
        onSubscribe(subscription)
        setSubscription(subscription)
      })
      .catch(error => {
        setSubscription(error)
        console.log('Failed to subscribe the user: ', error)
      })
  })
}

function unsubscribeUser(setSubscription, onUnsubscribe) {
  navigator.serviceWorker.ready.then(registration => {
    registration.pushManager
      .getSubscription()
      .then(sub => {
        if (sub) {
          const subscription = JSON.stringify(sub)
          onUnsubscribe(subscription)
          return sub.unsubscribe()
        }
      })
      .catch(error => {
        console.log('Error unsubscribing', error)
      })
      .then(() => {
        setSubscription(null)
      })
  })
}

PushButton.propTypes = {
  publicServerKey: PropTypes.string.isRequired,
  onSubscribe: PropTypes.func,
  onUnsubscribe: PropTypes.func,
  texts: PropTypes.object,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  preview: PropTypes.bool,
}

PushButton.defaultProps = {
  onSubscribe: () => {},
  onUnsubscribe: () => {},
  permissionState: () => {},
  preview: false,
  previewOptions: {
    title: 'Progressive Web App',
    options: {
      icon: 'https://i.ibb.co/SNrJhhL/notification.png',
      badge: 'https://i.ibb.co/CHF5MMp/badge.png',
      body: 'Awesome Push Notifications!',
    },
  },
  texts: {
    notifications: 'Notifications',
    enable: 'Enable',
    disable: 'Disable',
    blocked: 'Blocked',
  },
  component: 'button',
}

export default PushButton
