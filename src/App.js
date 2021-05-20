import './App.css';

import data from './data.json';
import ExpandablePanel from './ExpandablePanel';
import React, { useState } from 'react';

function App() {
  const [tree, setTree] = useState(data);

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function getNewNodeId(node) {
    if (node.children && node.children.length > 0) {
      return node.children[node.children.length - 1].id + 1;
    }
    return node.id + 1;
  }
  const onAddNode = (id) => {
    const addNodeById = (nodes, id) => {
      nodes.forEach((node) => {
        if (node.id === id) {
          node.children = node.children || [];
          const id = randomNumber(1, 1000); // unique id - important for find node
          const name = getNewNodeId(node);
          node.children.push({ id, title: node.title + '.' + id });
        }
        if (node.children && node.children.length) {
          addNodeById(node.children, id);
        }
      });
    };

    const updatedTree = JSON.parse(JSON.stringify(tree)); // deep clone
    addNodeById(updatedTree, id);
    setTree(updatedTree);
  };

  const onRemoveNode = (id) => {
    const removeNodeById = (nodes, id) => {
      const index = nodes.findIndex((e) => e.id === id);
      if (index > -1) {
        nodes.splice(index, 1);
      }
      nodes.forEach((node) => {
        if (node.children && node.children.length) {
          removeNodeById(node.children, id);
        }
      });
    };

    const updatedTree = JSON.parse(JSON.stringify(tree)); // deep clone
    removeNodeById(updatedTree, id);
    setTree(updatedTree);
  };

  return (
    <>
      <ExpandablePanel
        tree={tree}
        onAddNode={(id) => onAddNode(id)}
        onRemoveNode={(id) => onRemoveNode(id)}
      />

      {!tree.length && (
        <>
          <button onClick={() => setTree([{ id: 0, title: 'root' }])}>
            <span>+</span>
          </button>
        </>
      )}
    </>
  );
}

export default App;
