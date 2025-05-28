import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-white text-black border-b border-gray-300">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
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
                  <Image
                    className="block h-8 w-auto"
                    src="/logo-celoeu.png"
                    width={32}
                    height={32}
                    alt="Celo Europe Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center border-b-2 border-yellow-400 px-1 pt-1 text-sm font-medium text-black hover:border-yellow-300"
                  >
                    Home
                  </Link>
                  <Link
                    href="/guide"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-black hover:border-yellow-300"
                  >
                    Guide
                  </Link>
                  <Link
                    href="/veki"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-black hover:border-yellow-300"
                  >
                    Veki Program
                  </Link>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <DynamicWidget />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              <Disclosure.Button
                as={Link}
                href="/"
                className="block border-l-4 border-yellow-400 py-2 pl-3 pr-4 text-base font-medium text-black bg-white hover:bg-gray-100"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/guide"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-black bg-white hover:bg-gray-100"
              >
                Guide
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
