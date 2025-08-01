import { Provider } from "react-redux";
import { makeStore } from "./store";

const store = makeStore();

export function Providers({ children }: { children: React.ReactNode }) {
  const queryString = window.location.search;

  const params = new URLSearchParams(queryString);

  const encodedData = params.get('data');

  if (encodedData) {
    try {
      const decodedString = decodeURIComponent(encodedData);

      const receivedData = JSON.parse(decodedString);

      if (receivedData.user) {
        localStorage.setItem('user', JSON.stringify(receivedData.user));
      }
      if (receivedData.token) {
        localStorage.setItem('token', receivedData.token);
      }
    } catch (error) {
      console.error('Erro ao processar dados da URL:', error);
    }
  }
  // --- Início da funcionalidade de limpeza da URL ---
  // Pega a URL atual sem o queryString
  const baseUrl = window.location.origin + window.location.pathname;
  // Substitui o estado atual do histórico para limpar a URL
  window.history.replaceState({}, document.title, baseUrl);
  // --- Fim da funcionalidade de limpeza da URL ---
  return <Provider store={store}>
        {children}
    </Provider>
}
