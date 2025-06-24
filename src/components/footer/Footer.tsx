

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">
          Caseirinho<span className="text-yellow-300">+</span>
        </div>



        {/* Direitos */}
        <div className="text-xs text-red-200 text-center md:text-right">
          © {new Date().getFullYear()} Caseirinho+. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
