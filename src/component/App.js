import React from 'react';
import axios from '../api';


class App extends React.Component{

    getQuery = async () => {
        const response = await axios.get("/",{
         params:{
            lat: "111",
            long:"222"
         }
        }
          
        );

        console.log(response.data);
    }


    return <div>App</div>
}
}
// const App = () =>{


export default App;