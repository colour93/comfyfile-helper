import { useState } from 'react'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="flex gap-4 w-full justify-center text-sm">
      <li className="text-gray-500">Electron v{versions.electron}</li>
      <li className="text-gray-500">Chromium v{versions.chrome}</li>
      <li className="text-gray-500">Node v{versions.node}</li>
    </ul>
  )
}

export default Versions
