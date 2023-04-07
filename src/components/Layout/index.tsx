import { Lato } from 'next/font/google'
import { ReactNode } from 'react'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400'],
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`${lato.className} container mx-auto p-4`}>
      <header className="text-4xl font-semibold text-gray-800 text-center md:text-left">
        CQ Clothing
      </header>
      <main>{children}</main>
    </div>
  )
}
