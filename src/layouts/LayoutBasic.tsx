import { Outlet } from 'react-router-dom'
import TheNavbar from '../components/TheNavbar'

const LayoutBasic = () => {
  return (
    <div className="grid min-h-screen grid-cols-[1fr] grid-rows-[65px_1fr_auto]">
      <header>
        <TheNavbar />
      </header>
      <main className="mx-auto w-full max-w-screen-xl p-4">
        <Outlet />
      </main>
      <footer className="grid py-6 text-center">
        <p className="text-sm">© 2024 Jonas Voland</p>
      </footer>
    </div>
  )
}

export default LayoutBasic
