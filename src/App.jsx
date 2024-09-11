// // import { useState } from "react";
// // import "./App.css";

// // function App() {
// //   const [items, setItems] = useState([
// //     { id: 1, name: "Apple" },
// //     { id: 2, name: "Banana" },
// //     { id: 3, name: "Orange" },
// //   ]);

// //   const [container, setContainer] = useState([]);
// //   const [prevRemovedItem, setPrevRemovedItem] = useState([]);
// //   const [allRemoved, setAllRemoved] = useState([]);

// //   const removeItem = (id) => {
// //     const clickedItem = items.find((item) => item.id === id);
// //     // console.log(clickedItem);

// //     if (clickedItem) {
// //       const originalIndex = items.findIndex((item) => item.id === id);
// //       setContainer([...container, { ...clickedItem, originalIndex }]);
// //       // console.log(originalIndex);
// //       console.log(container);
      

// //       const updatedItems = items.filter((item) => item.id !== id);
// //       setItems(updatedItems);
// //     }
   
// //   };
// //   return (
// //     <>
// //       {items.map((item) => (
// //         <ul key={item.id}>
// //           <li>{item.name}</li>
// //           <button onClick={() => removeItem(item.id)}>Remove</button>
// //         </ul>
// //       ))}
// //     </>
// //   );
// // }

// // export default App;


// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [items, setItems] = useState([
//     { id: 1, name: "Apple" },
//     { id: 2, name: "Banana" },
//     { id: 3, name: "Orange" },
//   ]);

//   const [container, setContainer] = useState([]);
  
//   const removeItem = (id) => {
//     const clickedItem = items.find((item) => item.id === id);

//     if (clickedItem) {
//       const originalIndex = items.findIndex((item) => item.id === id);
//       const updatedContainer = [...container, { ...clickedItem, originalIndex }];
//       setContainer(updatedContainer);
//       const updatedItems = items.filter((item) => item.id !== id);
//       setItems(updatedItems);
//     }
//   };

//   const restoreLastItem = () => {
//     if (container.length > 0) {
//       const lastRemoved = container[container.length - 1];
//       const updatedContainer = container.slice(0, -1);
//       const updatedItems = [
//         ...items.slice(0, lastRemoved.originalIndex),
//         lastRemoved,
//         ...items.slice(lastRemoved.originalIndex),
//       ];
//       setItems(updatedItems);
//       setContainer(updatedContainer);
//     }
//   };

//   const resetAll = () => {
//     if (container.length > 0) {
//       const sortedRemoved = [...container].sort(
//         (a, b) => a.originalIndex - b.originalIndex
//       );
//       const restoredItems = [...items];
//       sortedRemoved.forEach((item) => {
//         restoredItems.splice(item.originalIndex, 0, item);
//       });
//       setItems(restoredItems);
//       setContainer([]);
//     }
//   };

//   return (
//     <>
//       <h2>Items:</h2>
//       {items.map((item) => (
//         <ul key={item.id}>
//           <li>{item.name}</li>
//           <button onClick={() => removeItem(item.id)}>Remove</button>
//         </ul>
//       ))}

//       <h2>Removed Items:</h2>
//       {container.length > 0 ? (
//         <>
//           {container.map((item, index) => (
//             <li key={index}>{item.name}</li>
//           ))}
//         </>
//       ) : (
//         <p>No items removed yet.</p>
//       )}

//       <div>
//         <button onClick={restoreLastItem}>Restore Last Removed Item</button>
//         <button onClick={resetAll}>Reset All</button>
//       </div>
//     </>
//   );
// }

// export default App;



import { useReducer } from "react";
import "./App.css";

const initialState = {
  items: [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
  ],
  container: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      const itemToRemove = state.items.find((item) => item.id === action.id);
      if (itemToRemove) {
        const updatedItems = state.items.filter((item) => item.id !== action.id);
        const originalIndex = state.items.findIndex((item) => item.id === action.id);
        const updatedContainer = [
          ...state.container,
          { ...itemToRemove, originalIndex },
        ];
        return {
          ...state,
          items: updatedItems,
          container: updatedContainer,
        };
      }
      return state;

    case "RESTORE_LAST_ITEM":
      if (state.container.length > 0) {
        const lastRemoved = state.container[state.container.length - 1];
        const updatedContainer = state.container.slice(0, -1);
        const restoredItems = [
          ...state.items.slice(0, lastRemoved.originalIndex),
          lastRemoved,
          ...state.items.slice(lastRemoved.originalIndex),
        ];
        return {
          ...state,
          items: restoredItems,
          container: updatedContainer,
        };
      }
      return state;

    case "RESET_ALL":
      if (state.container.length > 0) {
        const sortedRemoved = [...state.container].sort(
          (a, b) => a.originalIndex - b.originalIndex
        );
        let restoredItems = [...state.items];
        sortedRemoved.forEach((item) => {
          restoredItems.splice(item.originalIndex, 0, item);
        });
        return {
          ...state,
          items: restoredItems,
          container: [],
        };
      }
      return state;

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h2>Items:</h2>
      {state.items.map((item) => (
        <ul key={item.id}>
          <li>{item.name}</li>
          <button onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}>
            Remove
          </button>
        </ul>
      ))}

      <h2>Removed Items:</h2>
      {state.container.length > 0 ? (
        <>
          {state.container.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </>
      ) : (
        <p>No items removed yet.</p>
      )}

      <div>
        <button onClick={() => dispatch({ type: "RESTORE_LAST_ITEM" })}>
          Restore Last Removed Item
        </button>
        <button onClick={() => dispatch({ type: "RESET_ALL" })}>Reset All</button>
      </div>
    </>
  );
}

export default App;
