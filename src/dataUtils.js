export default function processProductData(rawData){
 console.log("RAW DATA", rawData);
 let nodes = [];
 let links = [];
 let productNode = {
     id: rawData.data.product.id,
     name: rawData.data.product.name,
     type: 'product'
 };
 nodes.push(productNode);
 let parameters = findParameters(rawData);
 for(let parameterId in parameters){
     console.log(`Njan enthu thettu cheythu ${parameterId}`)
     let node = nodeFactory(parameters[parameterId],parameterId,'parameter');
     let link = linkGenerator(rawData.data.product.id, node)
     for( let ruleId of node.rId ){
         let ruleNode = nodeFactory(rawData.data.rules[ruleId],ruleId,'rule');
         console.log('ruleNode', ruleNode);
         let ruleLink = linkGenerator(node.id, ruleNode)
         nodes.push(ruleNode)
         links.push(ruleLink);
     }
     nodes.push(node);
     links.push(link);

 }
 console.log("parameters",parameters)
 return {'nodes':nodes, 'links':links}//rawData.data.product;
}
function findParameters(rawData){
    return rawData.data.parameters
}
function findRulesForParamters(rawData, ruleId){
    return rawData.rules[ruleId];
}
function nodeFactory(data, id, type){
    const convertedToNode = {}
    console.log('TYPE-EEEE', data.name)
    if(type === 'parameter'){
        convertedToNode.id = id;
        convertedToNode.name = data.name;
        convertedToNode.type = type;
        convertedToNode.rId = data.rId;
    } else if(type==='rule'){
        convertedToNode.id = id;
        convertedToNode.pvg = data.propValGroup;
        convertedToNode.sc = data.selectionCondition;
        convertedToNode.ic = data.internalCondition;
        convertedToNode.name = data.action;
        convertedToNode.type = type;
    }
    return convertedToNode;
}
function linkGenerator(soureceId, data){
    return {'source':soureceId, 'target':data.id}
}