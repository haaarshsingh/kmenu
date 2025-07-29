import { Command, CommandMenu, CommandWrapper, useCommands } from 'kmenu'
import { useState } from 'react'
import { BsCommand, BsOption, BsShift } from 'react-icons/bs'

type Settings = {
  deploymentFailures: boolean
  cancelledDeployments: boolean
  configurations: boolean
  renewals: boolean
  transfers: boolean
  billingAlerts: boolean
}

export const Checkbox = () => {
  const [settings, setSettings] = useState<Settings>({
    deploymentFailures: true,
    cancelledDeployments: false,
    configurations: false,
    renewals: true,
    transfers: true,
    billingAlerts: true,
  })

  const notifications: Command[] = [
    {
      category: 'Deployments',
      commands: [
        {
          checkbox: { checked: settings.deploymentFailures },
          text: 'Deployment Failures',
          shortcuts: { modifier: <BsShift />, keys: ['X'] },
          perform: () =>
            setSettings((prev) => ({
              ...prev,
              deploymentFailures: !prev.deploymentFailures,
            })),
        },
        {
          checkbox: { checked: settings.cancelledDeployments },
          text: 'Cancelled Deployments',
          shortcuts: { modifier: <BsShift />, keys: ['W'] },
          perform: () =>
            setSettings((prev) => ({
              ...prev,
              cancelledDeployments: !prev.cancelledDeployments,
            })),
        },
      ],
    },
    {
      category: 'Domains',
      commands: [
        {
          checkbox: { checked: settings.configurations },
          text: 'Configurations',
          shortcuts: { modifier: <BsOption />, keys: ['Q'] },
          perform: () =>
            setSettings((prev) => ({
              ...prev,
              configurations: !prev.configurations,
            })),
        },
        {
          checkbox: { checked: settings.renewals },
          text: 'Renewals',
          shortcuts: { modifier: <BsOption />, keys: ['I'] },
          perform: () =>
            setSettings((prev) => ({
              ...prev,
              renewals: !prev.renewals,
            })),
        },
        {
          checkbox: { checked: settings.transfers },
          text: 'Transfers',
          shortcuts: { modifier: <BsOption />, keys: ['C'] },
          perform: () =>
            setSettings((prev) => ({
              ...prev,
              transfers: !prev.transfers,
            })),
        },
      ],
    },
    {
      category: 'Usage',
      commands: [
        {
          checkbox: { checked: settings.billingAlerts },
          text: 'Billing Alerts',
          shortcuts: { modifier: <BsCommand />, keys: ['<'] },
          perform: () =>
            setSettings((prev) => ({
              ...prev,
              billingAlerts: !prev.billingAlerts,
            })),
        },
      ],
    },
  ]

  const [notificationCommands] = useCommands(notifications)

  return (
    <CommandWrapper>
      <CommandMenu
        commands={notificationCommands}
        crumbs={['Settings', 'Notifications']}
        index={1}
        placeholder='Search notification settings...'
      />
    </CommandWrapper>
  )
}
