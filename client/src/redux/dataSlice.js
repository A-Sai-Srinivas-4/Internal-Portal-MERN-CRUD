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
      const response = await axios.post(baseURL + "employeedetails", item);
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
      const response = await axios.post(baseURL + "projectdetails", item);
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
      const { _id, ID, Name, Scrum_Master, Current_Sprint, Details } = item;

      const response = await axios.put(baseURL + "projectdetails/" + _id, {
        ID,
        Name,
        Scrum_Master,
        Current_Sprint,
        Details,
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
      const { _id, ID, Name, Image_url, Role, Team, Details } = item;

      const response = await axios.put(baseURL + "employeedetails/" + _id, {
        ID,
        Name,
        Image_url,
        Role,
        Team,
        Details,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProjectCard = createAsyncThunk(
  "redux/deleteProjectCard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseURL + "projectdetails/" + id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteEmployeeCard = createAsyncThunk(
  "redux/deleteEmployeeCard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseURL + "employeedetails/" + id);
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
  reducers: {},

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

    builder.addCase(deleteProjectCard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProjectCard.fulfilled, (state, action) => {
      const currentProjectCards = state.Resources.Project_Details.filter(
        (item) => item._id !== action.payload._id
      );
      state.loading = false;
      state.Resources = currentProjectCards;
      state.error = "";
    });
    builder.addCase(deleteProjectCard.rejected, (state, action) => {
      state.loading = false;
      state.Resources = [];
      state.error = action.error.message;
    });

    builder.addCase(deleteEmployeeCard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEmployeeCard.fulfilled, (state, action) => {
      const currentEmployeeCards = state.Resources.Project_Details.filter(
        (item) => item._id !== action.payload._id
      );
      state.loading = false;
      state.Resources = currentEmployeeCards;
      state.error = "";
    });
    builder.addCase(deleteEmployeeCard.rejected, (state, action) => {
      state.loading = false;
      state.Resources = [];
      state.error = action.error.message;
    });
  },
});

export default dataSlice.reducer;
