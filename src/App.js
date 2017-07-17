import { StackNavigator } from 'react-navigation';
import Login from './pages/Login';
import Generate from './pages/Timeline';
import Timeline from './pages/Generate';

const App = StackNavigator({
  Login: { screen: Login },
  Generate: { screen: Generate },
  Timeline: { screen: Timeline },
});

export default App;
