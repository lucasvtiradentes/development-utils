import { Header } from '../components/Header';
import { formatString } from '../utils/format-string';

const Home = () => {
  return (
    <>
      <Header />
      <p>Hello world 2 {formatString('testando!')}</p>
    </>
  );
};

export default Home;
