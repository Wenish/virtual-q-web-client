import { Outlet } from 'react-router-dom'

const LayoutBasic = () => {
  return (
    <div className="grid min-h-screen grid-cols-[1fr] grid-rows-[65px_1fr_auto]">
      <header>Header TBD</header>
      <main className="p-4 max-w-screen-xl w-full mx-auto">
        <Outlet />
      </main>
      <footer className="grid text-center py-24">
        <p className="text-sm">© 2024 Jonas Voland</p>
      </footer>
    </div>
  )
}

export default LayoutBasic
