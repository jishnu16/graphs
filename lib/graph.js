var UndirectedGraph = function(){
  this.graph={};
};

UndirectedGraph.prototype = {
    addVertex: function(vertex){
      this.graph[vertex]=[];
    },
    addEdge : function(from,to){
      this.graph[from].push(to);
      this.graph[to].push(from);
    },
    order : function(){
      return Object.keys(this.graph).length;
    },
    hasEdgeBetween : function(from, to){
      for(var i = 0; i < this.graph[from].length; i++){
          if(this.graph[from][i] == to)
            return true;
      }
      return false;
  },
  size : function(){
      var size = 0;
      for(var i in this.graph){
          size += this.graph[i].length;
      }
      return size/2;
  }
};

var DirectedGraph = function(){
  this.graph={};
}

DirectedGraph.prototype = {
  addVertex: function(vertex){
    this.graph[vertex]=[];
  },
  addEdge : function(from,to){
    this.graph[from].push(to);
  },
  order : function(){
        return Object.keys(this.graph).length;
  },
  size : function(){
      var size = 0;
      for(var i in this.graph){
          size += this.graph[i].length;
      }
      return size;
  },
  hasEdgeBetween : function(from, to){
    for(var i = 0; i < this.graph[from].length; i++){
        if(this.graph[from][i] == to)
          return true;
    }
    return false;
 }
};

var graphs = {DirectedGraph : DirectedGraph, UndirectedGraph : UndirectedGraph};
module.exports= graphs;
