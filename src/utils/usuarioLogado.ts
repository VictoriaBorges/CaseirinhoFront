export function usuarioEstaLogado(): boolean {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
  return !!usuario.token && usuario.token !== "undefined";
}
