import Produto from "./Produto";



export default interface Usuario {
  id?: number| null
  nome: string;
  usuario: string;
  senha: string;
  foto?: string;
  produto?: Produto[];
}
