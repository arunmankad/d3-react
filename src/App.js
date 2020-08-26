import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ForceLayout from './components/ForceLayout';
import processProductData from './dataUtils';

const dataset = {
  "nodes": [
    {"id": 1, "name": "Gen 2 Life","type": "product"},
    {"id": 2, "name": "Betty", "type": "parameter"},
    {"id": 3, "name": "Cate", "type": "parameter"},
    {"id": 4, "name": "Dave", "type": "parameter"},
    {"id": 5,"name": "Ellen","type": "rule"},
    { "id": 6, "name": "Fiona", "type": "rule"},
    {"id": 7,"name": "Garry","type": "rule"},
    {"id": 8,"name": "Holly","type": "rule"},
    {"id": 9,"name": "Iris","type": "rule"},
    {"id": 10,"name": "Jane","type": "rule"}
  ],
  "links": [
    {"source": 1,"target": 2},
    {"source": 1,"target": 3},
    {"source": 1,"target": 4},
    {"source": 2,"target": 5},
    {"source": 2,"target": 6},
    {"source": 3,"target": 7},
    {"source": 3,"target": 8},
    {"source": 4,"target": 9},
    {"source": 4,"target": 10}
  ]
};


function App() {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState('');
  const [height, setHeight] = useState(300);

	useEffect(() => {
    // console.log('Use Effect in App', window.innerWidth);
    // window.addEventListener('resize', updateWindowDimensions);
    // const url = 'https://www.otiscreate.com/api/iaaData?languageCode=en-us&productid=22&shareUid=null&mode=null';
    
    setData(dataset);
    
	}, []);
  
  
  const nodeHoverTooltip =(node)=>{
    console.log(`this is the tool tip hover function ${node}`);
    return `<div>${node.name}</div>`
  }

	const getDataFromUrl = () => {
    if(!url) return 
    axios.get(url).then((res)=>{
      console.log('URL data', res.data);
      const cool = processProductData(res.data);
      console.log('COOLLLLLLLL', cool);
      setData(cool);
    })
	}
  const handleChange = (e)=>{
    setUrl(e.target.value)
  }

	if(data === null) return <></>;

	return (
		<div className="App">
			<h2>Graphs with React</h2>
			<div className="btns">
        <input value={url} onChange={handleChange}></input>
        <button onClick={getDataFromUrl}>Get Data</button>
			</div>
			<ForceLayout data={data} nodeHoverTooltip={nodeHoverTooltip}  />
		</div>
	);
}

export default App;
