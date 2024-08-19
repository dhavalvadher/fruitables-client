

// import { ADD_SALESPEOPLE, DELETE_SALESPEOPLE, GET_SALESPEOPLE, EDIT_SALESPEOPLE
    
//  } from "../ActionType";

// export const getSalespeople = () => async (dispatch) => {
//     try {
//         const response = await fetch("http://localhost:9000/api/v1/salespeople/get-salespeople");
//         const data = await response.json();
//         dispatch({ type: GET_SALESPEOPLE, payload: data });
//     } catch (error) {
//         console.error("Failed to fetch salespeople:", error);
//     }
// }

// export const addSalespeople = (salespeople) => async (dispatch) => {
//     try {
//         const response = await fetch("http://localhost:9000/api/v1/salespeople/add-salespeople", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(salespeople)
//         });
//         const data = await response.json();
//         console.log(data);
//         dispatch({ type: ADD_SALESPEOPLE, payload: data.data });
//     } catch (error) {
//         console.error("Failed to add salespeople:", error);
//     }
// }

// export const deleteSalespeople = (snum) => async (dispatch) => {
//     try {
//         await fetch(`http://localhost:9000/api/v1/salespeople/delete-salesperson/${snum}`, {
//             method: 'DELETE'
//         });
//         dispatch({ type: DELETE_SALESPEOPLE, payload: snum });
//     } catch (error) {
//         console.error("Failed to delete salespeople:", error);
//     }
// }

// export const updateSalespeople = (data) => async (dispatch) => {
//     try {
//         await fetch(`http://localhost:9000/api/v1/salespeople/update-salesperson${data.snum}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         dispatch({ type: EDIT_SALESPEOPLE, payload: data });
//     } catch (error) {
//         console.error("Failed to update salespeople:", error);
//     }
// }