import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import useWalletConnect from '../../hooks/useWalletConnect';
import { shortenString } from '../../utils/strings';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { environment } from '../../utils/environment';
import abi from '../../artifacts/abi.json'
import { useContractWrite, useContractRead } from 'wagmi'
import { useSelector } from 'react-redux';
import CreateUserModal from '../modals/CreateUserModal';
import { IDKitWidget } from '@worldcoin/idkit'
import { routes } from '../../App'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { openModal, disconnect, isConnected, address, chain, chains, changeNetwork, balance } = useWalletConnect();
  
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const { userHasAccount } = useSelector((state) => ({
    userHasAccount: state.app.hasAccount,
  }))

  const handleSuccess = (data) => {
    console.log('handleSuccess', { data })
  }

  const handleVerify = (data) => {
    console.log('handleVerify', { data })
  }

  const renderNetworkMenu = () => {
    if (!chain) return null;
    return (
      <>
      { showCreateAccount && (<CreateUserModal close={() => setShowCreateAccount(false)} />)}
      <Menu as="div" className="relative inline-block text-left mr-2">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-indigo-500 rounded-lg text-white">
                Network: <b> {chain.name} </b>
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {chains.length > 1 && chains.map((item) => (
                  <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      onClick={() => changeNetwork(item.id)}
                      className={classNames(
                        item.id === chain.id  ? 'bg-gray-100 text-gray-900 font-bold' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </>
    )
  }

  return (
    <Disclosure as="nav" className="bg-white shadow mb-20">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  { routes.map((route) => (
                     <a
                     href={route.path}
                     className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                   >
                     {route.label}
                   </a>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!isConnected ? 
                <button
                  onClick={() => openModal()}
                  type="button"
                  className="relative rounded-full bg-white p-1"
                >                  
                  <span>Sign in with <b>WalletConnect</b></span>
                </button>
                : (
                  <>
                  { !userHasAccount && <button onClick={() => setShowCreateAccount(true)} className="text-sm mr-2 p-2 bg-orange-600 rounded-lg text-white">Create Account</button> }
                  { balance && <span className="text-sm mr-2 p-2 bg-green-600 rounded-lg text-white">Balance: <b>{balance.toString()}</b></span> }
                  { renderNetworkMenu() }
                  <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Connected as <b>{shortenString(address)}</b>
                      <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                      <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => {}}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              <IDKitWidget
                                app_id={environment.WORLDCOIN.APP_ID}
                                action="some-action"
                                onSuccess={handleSuccess}
                                handleVerify={handleVerify}
                                credential_types={['orb']}
                              >
                                {({ open }) => <div className='flex'>
                                <button onClick={open} className="mr-2">Verify with World ID </button>
                                <img width={20} src="https://images.prismic.io/worldcoin-company-website/80f08f79-ecb6-44d9-915f-85d40a9d98b9_logo.png?auto=compress,format"></img></div>}
                              </IDKitWidget>
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => disconnect()}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              <b>Sign out</b>
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                </>)
                }

                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {isConnected ? (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Connected as <b>{shortenString(address)}</b>
                          </a>
                        )}
                      </Menu.Item>) : (<Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            onClick={() => openModal()}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign in with <b>WalletConnect</b>
                          </a>
                        )}
                      </Menu.Item>)}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Calendar
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
