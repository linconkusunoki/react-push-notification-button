import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const PushButton = ({
  publicServerKey,
  onSubscribe,
  onUnsubscribe,
  ...props
}) => {
  const [subscription, setSubscription] = useState(null)

  const handleClick = () => {
    if (subscription) {
      unsubscribeUser(setSubscription, onUnsubscribe)
    } else {
      subscribeUser(setSubscription, onSubscribe, publicServerKey)
    }
  }

  useEffect(() => {
    checkSubscription(setSubscription)
  }, [])

  if (Notification.permission === 'denied') {
    return (
      <button {...props} disabled={true}>
        Notifications blocked
      </button>
    )
  }

  return (
    <button {...props} onClick={handleClick}>
      {subscription ? 'Disable' : 'Enable'} Notifications
    </button>
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

function subscribeUser(setSubscription, onSubscribe, publicServerKey) {
  const applicationServerKey = urlB64ToUint8Array(publicServerKey)
  return navigator.serviceWorker.ready.then(registration => {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      })
      .then(sub => {
        console.log('User is subscribed.')
        new Notification('You have subscribed!')
        const subscription = JSON.stringify(sub)
        onSubscribe(subscription)
        setSubscription(subscription)
      })
      .catch(error => {
        console.log('Failed to subscribe the user: ', error)
      })
  })
}

function unsubscribeUser(setSubscription, onUnsubscribe) {
  navigator.serviceWorker.ready.then(registration => {
    registration.pushManager
      .getSubscription()
      .then(subscription => {
        if (subscription) {
          onUnsubscribe(true)
          return subscription.unsubscribe()
        }
      })
      .catch(error => {
        console.log('Error unsubscribing', error)
      })
      .then(() => {
        console.log('User is unsubscribed.')
        setSubscription(null)
      })
  })
}

PushButton.propTypes = {
  publicServerKey: PropTypes.string.isRequired,
  onSubscribe: PropTypes.func,
  onUnsubscribe: PropTypes.func,
}

PushButton.defaultProps = {
  onSubscribe: () => {},
  onUnsubscribe: () => {},
}

export default PushButton
