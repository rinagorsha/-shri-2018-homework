import * as React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import EventsPage from '../pages/EventsPage/EventsPage';
import Monitoring from '../pages/Monitoring/Monitoring';
import store from '../store/locationStore';

type AppState = {
  location: string,
}

type AppProps = null;

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      location: store.getState().currentPage,
    }

    store.addListener(this.changePage.bind(this));
  }
  

  render() {
    const { location } = this.state;

    return (
      <React.Fragment>
        <Header />
        <Main>
          {() => {
            switch (location) {
              case 'monitoring': return <Monitoring />;
              default: return <EventsPage />;
            }
          }}
        </Main>
        <Footer />
      </React.Fragment>
    );
  }

  changePage = () => {
    this.setState({
      location: store.getState().currentPage,
    })
  }
}

export default App;
