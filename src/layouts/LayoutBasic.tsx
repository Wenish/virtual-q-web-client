import { Outlet } from 'react-router-dom'

const LayoutBasic = () => {
  return (
    <div className="grid min-h-screen grid-cols-[1fr] grid-rows-[65px_1fr_auto]">
      <header>Header TBD</header>
      <main className="mx-auto w-full max-w-screen-xl p-4">
        <Outlet />
      </main>
      <footer className="grid py-24 text-center">
        <p className="text-sm">© 2024 Jonas Voland</p>
      </footer>
    </div>
  )
}

export default LayoutBasic
