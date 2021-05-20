import React, { useState } from 'react';

const ExpandablePanel = ({ tree, onAddNode, onRemoveNode }) => {
  const expandedStates = tree.reduce((acc, curr) => {
    acc[curr.id] = true; // default open
    return acc;
  }, {});
  const [expanded, setExpanded] = useState(expandedStates);

  return (
    <ul>
      {tree.map((node) => {
        return (
          <li key={node.id}>
            {node.title}

            <button onClick={() => onAddNode(node.id)}>
              <span>+</span>
            </button>
            <button onClick={() => onRemoveNode(node.id)}>
              <span>-</span>
            </button>

            {node.children && !!node.children.length && (
              <>
                <button
                  onClick={() =>
                    setExpanded((prevState) => {
                      return { ...prevState, [node.id]: !prevState[node.id] };
                    })
                  }
                >
                  {expanded[node.id] && <span>↑</span>}
                  {!expanded[node.id] && <span>↓</span>}
                </button>

                {expanded[node.id] && (
                  <>
                    <ExpandablePanel
                      tree={node.children}
                      onAddNode={onAddNode}
                      onRemoveNode={onRemoveNode}
                    />
                  </>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ExpandablePanel;
