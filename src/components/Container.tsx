interface ContainerProps {
  children: React.ReactNode;
}
import { Footer } from './Footer';
import { Header } from './Header';
export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <Header/>
        {children}
        <Footer/>
      </div>
    </div>
  );
};