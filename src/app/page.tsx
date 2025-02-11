import { redirect } from 'next/navigation';

export default function Home() {
  // Redireciona automaticamente para a página de login
  redirect('/login');
  return null; // Esta linha nunca será exibida, mas é necessária para evitar erro de retorno vazio
}