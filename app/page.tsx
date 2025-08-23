import Image from "next/image";
import ScrollTextAnimation from './components/ScrollTextAnimation';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';


export default function Home() {
  return (
    <div className="Home flex flex-col items-center">
      <ScrollTextAnimation></ScrollTextAnimation>
    </div>
  );
}
