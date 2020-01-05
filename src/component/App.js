import React from 'react';
import axios from '../api';


class App extends React.Component{

    componentDidMount(){
        this.getQuery();
    }
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


    render(){
        return <div>App</div>
    }
}
// const App = () =>{

//     return <div>App</div>
// }

export default App;