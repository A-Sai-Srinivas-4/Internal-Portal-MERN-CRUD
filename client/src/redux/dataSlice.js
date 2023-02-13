import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  Resources: {
    Project_Details: [],
    Employee_Details: [],
  },
  error: "",
};

const baseURL = "http://localhost:8000/api/";
// const Project_Details = "http://localhost:8000/api/projectdetails";
//const Employee_Details = "http://localhost:8000/api/employeedetails";

// export const fetchData = createAsyncThunk("redux/fetchData", async () => {
//   // Fetch your data here and return it
//   const response = await fetch(Resources);
//   const data = await response.json();
//   return data;
// });

export const fetchData = createAsyncThunk(
  "todos/fetchData",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL + "resources");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addEmployeeCard = createAsyncThunk(
  "redux/addEmployeeCard",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL+ "employeedetails", item);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addProjectCard = createAsyncThunk(
  "redux/addProjectCard",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL+ "projectdetails", item);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProjectCard = createAsyncThunk(
  "redux/updateProjectCard",
  async (item, { rejectWithValue }) => {
    try {
      const { _id, ID, Name, Scrum_Master, Current_Sprint, Details  } = item;

      const response = await axios.put(baseURL + "projectdetails/" + _id, {
        ID, Name, Scrum_Master, Current_Sprint, Details 
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateEmployeeCard = createAsyncThunk(
  "redux/updateEmployeeCard",
  async (item, { rejectWithValue }) => {
    try {
      const { _id,  ID, Name, Image_url, Role, Team, Details  } = item;

      const response = await axios.put(baseURL + "employeedetails/" + _id, {
        ID, Name, Image_url, Role, Team, Details 
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // addProjectDetails: (state, action) => {
    //   state.Resources.Project_Details.push(action.payload);
    // },
    // addEmployeeDetails: (state, action) => {
    //   console.log(action);
    //   //console.log(state)
    //   state.Resources.Employee_Details.push(action.payload);
    // },
    // updateProjectDetails: (state, action) => {
    //   const projectIndex = state.Resources.Project_Details.findIndex(
    //     (project) => project.id === action.payload.id
    //   );
    //   state.Resources.Project_Details[projectIndex] = action.payload;
    // },
    // updateEmployeeDetails: (state, action) => {
    //   const employeeIndex = state.Resources.Employee_Details.findIndex(
    //     (employee) => employee.id === action.payload.id
    //   );
    //   state.Resources.Employee_Details[employeeIndex] = action.payload;
    // },
    // deleteProjectDetails: (state, action) => {
    //   state.Resources.Project_Details = state.Resources.Project_Details.filter(
    //     (project) => project.id !== action.payload.id
    //   );
    // },
    // deleteEmployeeDetails: (state, action) => {
    //   state.Resources.Employee_Details =
    //     state.Resources.Employee_Details.filter(
    //       (employee) => employee.id !== action.payload.id
    //     );
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.Resources = action.payload.Resources;
      state.error = "";
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.Resources = [];
      state.error = action.error.message;
    });
    builder.addCase(updateProjectCard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProjectCard.fulfilled, (state, action) => {
      const updatedProject = state.Resources.Project_Details.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.loading = false;
      state.Resources = updatedProject;
      state.error = "";
    });
    builder.addCase(updateProjectCard.rejected, (state, action) => {
      state.loading = false;
      state.Resources = [];
      state.error = action.error.message;
    });
  },
  // extraReducers: {
  //   [fetchData.fulfilled]: (state, action) => {
  //     state.Resources = action.payload.Resources;
  //   },
  // },
});

export const {
  addProjectDetails,
  addEmployeeDetails,
  updateProjectDetails,
  updateEmployeeDetails,
  deleteProjectDetails,
  deleteEmployeeDetails,
} = dataSlice.actions;

export default dataSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const Resources = "http://localhost:8000/api/resources";
// const Project_Details = "http://localhost:8000/api/projectdetails";
// const Employee_Details = "http://localhost:8000/api/employeedetails";

// const initialState = {
//   items: [],
//   addProjectCardStatus: "",
//   addProjectCardError: "",
//   addEmployeeCardStatus: "",
//   addEmployeeCardError: "",
//   getCardsStatus: "",
//   getCardsError: "",
//   deleteCardStatus: "",
//   deleteCardError: "",
//   updateCardStatus: "",
//   updateCardError: "",
// };

// export const getCards = createAsyncThunk(
//   "redux/getCards",
//   async (id = null, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(Resources);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const addProjectCard = createAsyncThunk(
//   "redux/addProjectCard",
//   async (item, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(Project_Details, item);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const addEmployeeCard = createAsyncThunk(
//   "redux/addEmployeeCard",
//   async (item, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(Employee_Details, item);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// const dataSlice = createSlice({
//   name: "data",
//   initialState,
//   reducers: {
//     addData: (state, action) => {
//       console.log(action.payload)
//       state.items.push(action.payload);
//     },
//     // updateData: (state, action) => {
//     //   const { id, newItem } = action.payload;
//     //   const itemIndex = state.Data.items.findIndex((item) => item.id === id);
//     //   state.Data.items[itemIndex] = newItem;
//     // },
//     // deleteData: (state, action) => {
//     //   const itemIndex = state.Data.items.findIndex(
//     //     (item) => item.id === action.payload
//     //   );
//     //   state.Data.items.splice(itemIndex, 1);
//     // },
//   },
//   extraReducers: {
//     // [addProjectCard.pending]: (state, action) => {
//     //   return {
//     //     ...state,
//     //     addProjectCardStatus: "pending",
//     //     addProjectCardError: "",
//     //     addEmployeeCardStatus: "",
//     //     addEmployeeCardError: "",
//     //     getCardsStatus: "",
//     //     getCardsError: "",
//     //     deleteCardStatus: "",
//     //     deleteCardError: "",
//     //     updateCardStatus: "",
//     //     updateCardError: "",
//     //   };
//     // },
//     // [addProjectCard.fulfilled]: (state, action) => {
//     //   // state.todos.push(action.payload);
//     //   return {
//     //     ...state,
//     //     items: [action.payload, ...state.items],
//     //     addProjectCardStatus: "Success",
//     //     addProjectCardError: "",
//     //     addEmployeeCardStatus: "",
//     //     addEmployeeCardError: "",
//     //     getCardsStatus: "",
//     //     getCardsError: "",
//     //     deleteCardStatus: "",
//     //     deleteCardError: "",
//     //     updateCardStatus: "",
//     //     updateCardError: "",
//     //   };
//     // },
//     // [addProjectCard.rejected]: (state, action) => {
//     //   return {
//     //     ...state,
//     //     addProjectCardStatus: "Rejected",
//     //     addProjectCardError: action.payload,
//     //     addEmployeeCardStatus: "",
//     //     addEmployeeCardError: "",
//     //     getCardsStatus: "",
//     //     getCardsError: "",
//     //     deleteCardStatus: "",
//     //     deleteCardError: "",
//     //     updateCardStatus: "",
//     //     updateCardError: "",
//     //   };
//     // },
//     // [addEmployeeCard.pending]: (state, action) => {
//     //   return {
//     //     ...state,
//     //     addProjectCardStatus: "",
//     //     addProjectCardError: "",
//     //     addEmployeeCardStatus: "pending",
//     //     addEmployeeCardError: "",
//     //     getCardsStatus: "",
//     //     getCardsError: "",
//     //     deleteCardStatus: "",
//     //     deleteCardError: "",
//     //     updateCardStatus: "",
//     //     updateCardError: "",
//     //   };
//     // },
//     // [addEmployeeCard.fulfilled]: (state, action) => {
//     //    //state.items.push(action.payload);
//     //    console.log(action.meta.arg)
//     //   return {
//     //     ...state,
//     //     items: [action.meta.arg, ...state.items],
//     //     addProjectCardStatus: "",
//     //     addProjectCardError: "",
//     //     addEmployeeCardStatus: "Success",
//     //     addEmployeeCardError: "",
//     //     getCardsStatus: "",
//     //     getCardsError: "",
//     //     deleteCardStatus: "",
//     //     deleteCardError: "",
//     //     updateCardStatus: "",
//     //     updateCardError: "",
//     //   };
//     // },
//     // [addEmployeeCard.rejected]: (state, action) => {
//     //   return {
//     //     ...state,
//     //     addProjectCardStatus: "",
//     //     addProjectCardError: "",
//     //     addEmployeeCardStatus: "Rejected",
//     //     addEmployeeCardError: action.payload,
//     //     getCardsStatus: "",
//     //     getCardsError: "",
//     //     deleteCardStatus: "",
//     //     deleteCardError: "",
//     //     updateCardStatus: "",
//     //     updateCardError: "",
//     //   };
//     // },
//     [getCards.pending]: (state, action) => {
//       return {
//         ...state,
//         addProjectCardStatus: "",
//         addProjectCardError: "",
//         addEmployeeCardStatus: "",
//         addEmployeeCardError: "",
//         getCardsStatus: "pending",
//         getCardsError: "",
//         deleteCardStatus: "",
//         deleteCardError: "",
//         updateCardStatus: "",
//         updateCardError: "",
//       };
//     },
//     [getCards.fulfilled]: (state, action) => {
//       return {
//         ...state,
//         items: action.payload,
//         addProjectCardStatus: "",
//         addProjectCardError: "",
//         addEmployeeCardStatus: "",
//         addEmployeeCardError: "",
//         getCardsStatus: "Success",
//         getCardsError: "",
//         deleteCardStatus: "",
//         deleteCardError: "",
//         updateCardStatus: "",
//         updateCardError: "",
//       };
//     },
//     [getCards.rejected]: (state, action) => {
//       return {
//         ...state,
//         addProjectCardStatus: "",
//         addProjectCardError: "",
//         addEmployeeCardStatus: "",
//         addEmployeeCardError: "",
//         getCardsStatus: "Rejected",
//         getCardsError: action.payload,
//         deleteCardStatus: "",
//         deleteCardError: "",
//         updateCardStatus: "",
//         updateCardError: "",
//       };
//     },
//     // [deleteTodo.pending]: (state, action) => {
//     //   return {
//     //     ...state,
//     //     addTodoStatus: "",
//     //     addTodoError: "",
//     //     getTodosStatus: "",
//     //     getTodosError: "",
//     //     deleteTodoStatus: "pending",
//     //     deleteTodoError: "",
//     //     updateTodoStatus: "",
//     //     updateTodoError: "",
//     //   };
//     // },
//     // [deleteTodo.fulfilled]: (state, action) => {
//     //   const currentTodos = state.todos.filter(
//     //     (todo) => todo._id !== action.payload._id
//     //   );
//     //   return {
//     //     ...state,
//     //     todos: currentTodos,
//     //     addTodoStatus: "",
//     //     addTodoError: "",
//     //     getTodosStatus: "",
//     //     getTodosError: "",
//     //     deleteTodoStatus: "success",
//     //     deleteTodoError: "",
//     //     updateTodoStatus: "",
//     //     updateTodoError: "",
//     //   };
//     // },
//     // [deleteTodo.rejected]: (state, action) => {
//     //   state = {
//     //     ...state,
//     //     addTodoStatus: "",
//     //     addTodoError: "",
//     //     getTodosStatus: "",
//     //     getTodosError: "",
//     //     deleteTodoStatus: "rejected",
//     //     deleteTodoError: action.payload,
//     //     updateTodoStatus: "",
//     //     updateTodoError: "",
//     //   };
//     // },
//     // [updateTodo.pending]: (state, action) => {
//     //   return {
//     //     ...state,
//     //     addTodoStatus: "",
//     //     addTodoError: "",
//     //     getTodosStatus: "",
//     //     getTodosError: "",
//     //     deleteTodoStatus: "",
//     //     deleteTodoError: "",
//     //     updateTodoStatus: "pending",
//     //     updateTodoError: "",
//     //   };
//     // },
//     // [updateTodo.fulfilled]: (state, action) => {
//     //   const updatedTodos = state.todos.map((todo) =>
//     //     todo._id === action.payload._id ? action.payload : todo
//     //   );
//     //   return {
//     //     ...state,
//     //     todos: updatedTodos,
//     //     addTodoStatus: "",
//     //     addTodoError: "",
//     //     getTodosStatus: "",
//     //     getTodosError: "",
//     //     deleteTodoStatus: "",
//     //     deleteTodoError: "",
//     //     updateTodoStatus: "success",
//     //     updateTodoError: "",
//     //   };
//     // },
//     // [updateTodo.rejected]: (state, action) => {
//     //   return {
//     //     ...state,
//     //     addTodoStatus: "",
//     //     addTodoError: "",
//     //     getTodosStatus: "",
//     //     getTodosError: "",
//     //     deleteTodoStatus: "",
//     //     deleteTodoError: "",
//     //     updateTodoStatus: "rejected",
//     //     updateTodoError: action.payload,
//     //   };
//     // },
//   },
// });
// export const { addData } = dataSlice.actions;
// export default dataSlice.reducer;
