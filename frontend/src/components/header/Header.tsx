interface HeaderProps {
  toggleCart: () => void;
}

export default function Header({ toggleCart }: HeaderProps) {
  return (
    <header className="bg-purple-800 text-white p-4 fixed w-full top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">Logo</div>
          <nav>
            <a href="/" className="mx-2">
              Produtos
            </a>
            <a href="/login" className="mx-2">
              Login
            </a>
          </nav>
        </div>
        <button onClick={toggleCart} className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18M3 3l1.293 1.293a1 1 0 011.414 0L12 12l6.293-6.707a1 1 0 011.414 0L21 3M3 3v18a3 3 0 003 3h12a3 3 0 003-3V3"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}