import { AppRoute } from '../../const';
import Footer from '../footer/footer';
import Header from '../header/header';

type LayoutProps = {
  children: JSX.Element;
  layoutType: AppRoute;
}

export default function Layout ({
  children,
  layoutType,
}: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header headerType={layoutType} />
      {children}
      <Footer />
    </div>
  );
}
