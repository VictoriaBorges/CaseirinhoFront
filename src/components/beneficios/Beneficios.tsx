import { FaRocket, FaFireAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Beneficios() {
  return (
    <section className="bg-red-700 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Item 1 */}
        <div className="flex flex-col items-center">
          <FaRocket size={40} className="mb-4 text-red-100" />
          <h3 className="text-lg font-bold">Entrega rápida</h3>
          <p className="text-sm text-red-200">Receba seu pedido eu rapidament... em si 😅</p>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-center">
          <FaFireAlt size={40} className="mb-4 text-red-100" />
          <h3 className="text-lg font-bold">Promoções diárias</h3>
          <p className="text-sm text-red-200">Economize com ofertas e descontos.</p>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-center">
          <FaMapMarkerAlt size={40} className="mb-4 text-red-100" />
          <h3 className="text-lg font-bold">Encontre os melhores perto de você</h3>
          <p className="text-sm text-red-200">Localiza restaurantes da sua região.</p>
        </div>
      </div>
    </section>
  );
}
