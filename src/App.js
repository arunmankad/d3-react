import React, { useState, useEffect } from 'react';
import './App.css';
import ForceLayout from './components/ForceLayout';

const dataset = {
  "nodes": [
    {"id": 1, "name": "Gen 2 Life","type": "product"},
    {"id": 2, "name": "Betty", "type": "property"},
    {"id": 3, "name": "Cate", "type": "property"},
    {"id": 4, "name": "Dave", "type": "property"},
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
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(300);

	useEffect(() => {
    console.log('Use Effect in App', window.innerWidth);
    // window.addEventListener('resize', updateWindowDimensions);
		setData(dataset);
	}, []);
  const updateWindowDimensions = () => {
    alert(window.innerWidth)
  }
	function deepCopy(obj){
		return JSON.parse(JSON.stringify(obj));
  }
  
  const nodeHoverTooltip =(node)=>{
    console.log(`this is the tool tip hover function ${node}`);
    return `<div>${node.name}</div>`
  }

	const updateData1 = () => {
		var _data = deepCopy(data);
		_data.nodes.push(
      {
        "id": 3,
        "name": "Arun",
        "gender": "male"
      }
    )
		console.log("updateData1", _data);

		setData(_data);
	}

	const updateData2 = () => {
		var _data = deepCopy(data);
		
		_data["children"][0]["children"].push({
			"name":"mister_p",
			"group":"C",
			"value":20,
			"colname":"level3"
		})

		_data["children"][2]["children"].splice(2,1);

		setData(_data);
	}

	const updateData3 = () => {
		var _data = deepCopy(data);

		_data["children"].push({
			"name": "boss4",
			"children": [{
				"name":"mister_z",
				"group":"E",
				"value":40,
				"colname":"level3"
			}]
		});

		setData(_data);
	}

	const updateData4 = () => {
		var _data = deepCopy(data);

		_data["children"].splice(1,1);

		setData(_data);
	}

	const resetData = () => {
		setData(dataset);
	}

	if(data === null) return <></>;

	return (
		<div className="App">
			<h2>Graphs with React</h2>
			<div className="btns">
				<button onClick={updateData1}>Add 1 more Node</button>
				<button onClick={updateData2}>Add/Remove Child Nodes</button>
				<button onClick={updateData3}>Add Parent Nodes</button>
				<button onClick={updateData4}>Remove Parent Nodes</button>
				<button onClick={resetData}>Reset</button>
			</div>
			<ForceLayout data={data} nodeHoverTooltip={nodeHoverTooltip}  />
		</div>
	);
}

export default App;
