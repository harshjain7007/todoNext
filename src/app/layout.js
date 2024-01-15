import { Inter } from 'next/font/google'
import './globals.css'
import "../../Styles/app.scss"
import Header from './header'
import { ContextProvider } from '../../Components/Clients'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'todo app',
  description: 'todo project for practice nextjs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  )
}
