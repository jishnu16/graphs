var ld = require('lodash') ;

var WeightedGraph = function(){
  this.graph={};
}
var Edge = function(edgeName,from,to,weight){
  this.edgeName = edgeName;
  this.from = from;
  this.to = to;
  this.weight = weight;
};

WeightedGraph.prototype ={
      addVertex: function(vertex){
        this.graph[vertex]=[];
      },
      addEdge : function(edge){
           this.graph[edge.from].push(edge);
       },
      shortestPath : function(from, to) {
           var parent = {},distance = {},path = [];
           var allVertices = Object.keys(this.graph);
           var tempParent = to;
           allVertices.forEach(function(index){distance[index] = Infinity;});
           parent[from] = from;
           distance[from] =0;
           while (allVertices.length) {
               processDistance(parent,distance,allVertices,this.graph);
           };
           while (tempParent != from) {
              var vertex = parent[tempParent];
              var edges = getAdjcentEdges(vertex,this.graph);
              edges = edges.filter(function(edge){ return edge.to == tempParent});
              var edge = edges.reduce(function(edgeOne,edgeTwo){ return edgeOne.weight < edgeTwo.weight?edgeOne:edgeTwo;});
              path.push(edge);
              tempParent = vertex;
           }
           return path.reverse()
         }
 }
 var processDistance = function(parent,distance,allVertices,graph) {
   var vertexToProcess = findMinimalVertex(distance, allVertices);
   ld.remove(allVertices, function(index) {return vertexToProcess == index;});
   var adjcentEdges = getAdjcentEdges(vertexToProcess,graph);
   adjcentEdges.forEach(function(edge) {
       if (distance[edge.to] > (distance[vertexToProcess] + edge.weight)) {
           distance[edge.to] = distance[vertexToProcess] + edge.weight;
           parent[edge.to] = vertexToProcess;
       }
   });
 }

 var getAdjcentEdges = function(vertex, graph) {
     var arr = [];
     for (var i in graph[vertex])
         arr.push(graph[vertex][i]);
     return arr;
 };
 var findMinimalVertex = function(distance, allVertex) {
     var key = allVertex[0];
     var min = distance[key];
     for (var i = 0; i < allVertex.length; i++) {
         if (min > distance[allVertex[i]]) {
             min = distance[allVertex[i]];
             key = allVertex[i];
         }
     };
     return key;
 };
var graphs = {WeightedGraph:WeightedGraph, Edge : Edge};
module.exports = graphs;
