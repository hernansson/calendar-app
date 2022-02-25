import App from '../pages/App'
import Calendar from '../pages/Calendar'
import Error from '../pages/Error'

const Routes = [
    {
path: '/',
        component: <App />,
        exact: true,
},
    {
path: '/calendar',
        component: <Calendar />,
        exact: true,
},
    {
path: '/error',
        component: <Error />,
        exact: true,
},
]

export default Routes
