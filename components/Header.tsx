// import Link from 'next/link'

// export default function Header() {
//   return (
//     <header className="bg-white shadow-md">
//       <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <span className="text-2xl font-bold text-blue-600">LabLens</span>
//         </div>
//         <ul className="flex space-x-6">
//           <li><Link href="#" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</Link></li>
//           <li><Link href="#features" className="text-gray-700 hover:text-blue-600 transition duration-300">Features</Link></li>
//           <li><Link href="#about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</Link></li>
//           <li><Link href="#contact" className="text-gray-700 hover:text-blue-600 transition duration-300">Contact</Link></li>
//         </ul>
//       </nav>
//     </header>
//   )
// }

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-blue-600">Lab</span>
              <span className="text-gray-900">Lens</span>
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex md:space-x-6 sm:space-x-2">
            <li><Link href="/#features" className="text-gray-700 hover:text-blue-600 transition duration-300">Features</Link></li>
            <li><Link href="/#about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</Link></li>
            <li><Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition duration-300">Contact</Link></li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}