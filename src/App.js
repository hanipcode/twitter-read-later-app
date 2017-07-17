import { StackNavigator } from 'react-navigation';
import Login from './pages/Login';
import Generate from './pages/Generate';
import Timeline from './pages/Timeline';

const App = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Generate: { screen: Generate },
  Timeline: { screen: Timeline },
});

export default App;
