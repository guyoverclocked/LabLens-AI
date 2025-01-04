import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">LabLens</span>
        </div>
        <ul className="flex space-x-6">
          <li><Link href="#" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</Link></li>
          <li><Link href="#features" className="text-gray-700 hover:text-blue-600 transition duration-300">Features</Link></li>
          <li><Link href="#about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</Link></li>
          <li><Link href="#contact" className="text-gray-700 hover:text-blue-600 transition duration-300">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}