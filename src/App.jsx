import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FlightSearch from './pages/FlightSearch';
import FlightResults from './pages/FlightResults';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import Trips from './pages/Trips';
import TripDetails from './pages/TripDetails';
import Activities from './pages/Activities';
import ActivityDetails from './pages/ActivityDetails';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import SearchResults from './pages/SearchResults';
import Bookings from './pages/Bookings';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<FlightSearch />} />
            <Route path="/flights/results" element={<FlightResults />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/:id" element={<ActivityDetails />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
