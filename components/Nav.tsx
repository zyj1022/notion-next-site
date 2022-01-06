import Link from 'next/link'

const ExternalLink = ({ href, children }) => (
  <a
    className="p-1 sm:p-4 text-gray-900 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
)

export default function Nav() {
  return (
    <div className="w-full p-2">
      <nav className="flex justify-between items-center m-auto   max-w-screen-lg">
        <div className="flex items-center">
          <a href="/" className="rounded-full h-14 w-14 bg-slate-100"></a>
        </div>
        <div className="flex items-center">
          <Link href="/">
            <a className="mx-2 rounded-full px-6 py-2 text-gray-900 hover:text-gray-100 hover:bg-black transition">
              Home
            </a>
          </Link>
          <Link href="/">
            <a className="mx-2 rounded-full px-6 py-2 text-black hover:text-gray-100 hover:bg-black transition">
              About
            </a>
          </Link>
          <Link href="/">
            <a className="mx-2 rounded-full bg-black px-6 py-2 text-gray-100 hover:text-gray-100 hover:bg-black transition">
              Contact me
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}
