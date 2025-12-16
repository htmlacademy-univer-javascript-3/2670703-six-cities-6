import MainPage from '../MainPage/MainPage';

type AppProps = {
  offersCount: number;
};

function App({ offersCount }: AppProps) {
  return <MainPage offersCount={offersCount} />;
}

export default App;
