var ld = require('lodash') ;
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
  },
  pathBetween : function(from,to,path){
    console.log(this.graph);
    var path = path || [from];
    if(from == to) return path;
    if(this.graph[from].indexOf(to) != -1)
      return path.concat(to);

    for (var i in this.graph[from]){
        var adjacent = this.graph[from][i];
        if(path.indexOf(adjacent) == -1)
            var traversedPath = this.pathBetween(adjacent,to,path.concat(adjacent)) ;
        if(traversedPath && traversedPath.indexOf(to) != -1)
          return traversedPath;
    }
    return [];
  },
  farthestVertex : function(from,traversedPath){
     var traversedPath = traversedPath || [from];
     for (var i in this.graph[from]){
         var adjacent = this.graph[from][i];
         if(traversedPath.indexOf(adjacent) == -1)
             return this.farthestVertex(adjacent,traversedPath.concat(adjacent)) ;
     }
     return from;
 },
 allPaths : function(from, to, paths, traversedPaths){
    var paths = paths || [];
    var traversedPaths = traversedPaths || [];
    if(from == to) return traversedPaths.concat(from);

    for(var i = 0; i < this.graph[from].length; i++){
        var adjacent = this.graph[from][i];
        if(traversedPaths.indexOf(adjacent) == -1){
            var currentPath = this.allPaths(adjacent, to, paths, traversedPaths.concat(from));
            if(ld.last(currentPath) == to)
				paths.push(currentPath);
        }
    }
	return paths;
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
 },
 pathBetween : function(from,to,path){
   var path = path || [from];
   if(from == to) return path;
   if(this.graph[from].indexOf(to) != -1)
     return path.concat(to);
   for (var i in this.graph[from]){
       var adjacent = this.graph[from][i];
       if(path.indexOf(adjacent) == -1)
           var traversedPath = this.pathBetween(adjacent,to,path.concat(adjacent)) ;
       if(traversedPath && traversedPath.indexOf(to) != -1)
         return traversedPath;
   }
   return [];
 },
 farthestVertex : function(from,traversedPath){
    var traversedPath = traversedPath || [from];
    for (var i in this.graph[from]){
        var adjacent = this.graph[from][i];
        if(traversedPath.indexOf(adjacent) == -1)
            return this.farthestVertex(adjacent,traversedPath.concat(adjacent)) ;
    }
    return from;
},
 allPaths : function(from, to, paths, traversedPaths){
    var paths = paths || [];
    var traversedPaths = traversedPaths || [];
    if(from == to) return traversedPaths.concat(from);

    for(var i = 0; i < this.graph[from].length; i++){
        var adjacent = this.graph[from][i];
        if(traversedPaths.indexOf(adjacent) == -1){
            var currentPath = this.allPaths(adjacent, to, paths, traversedPaths.concat(from));
            if(ld.last(currentPath) == to)
				paths.push(currentPath);
        }
    }
	return paths;
}
};

var graphs = {DirectedGraph : DirectedGraph, UndirectedGraph : UndirectedGraph};
module.exports= graphs;
