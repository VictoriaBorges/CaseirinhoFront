import Restaurante from "./Restaurante";

export default interface Produto {
  id?: number | null
  nomeProduto: string;
  foto?: string;
  porcao: number;
  preco: number;
  quantidadeVendida: number;
  restaurante: Restaurante;
}
