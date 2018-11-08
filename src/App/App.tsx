import * as React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import EventsPage from '../EventsPage/EventsPage';

const App = () => (
  <React.Fragment>
    <Header />
    <Main>
      <EventsPage />
    </Main>
    {/* <EventsPage />
    <VideoPage /> */}
    <Footer />
  </React.Fragment>
);

export default App;
