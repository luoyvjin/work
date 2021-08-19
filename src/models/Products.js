import { getProducts } from "../services/api";
let state = {};
state.size = [
  { name: "XS", action: false },
  { name: "S", action: false },
  { name: "M", action: false },
  { name: "ML", action: false },
  { name: "L", action: false },
  { name: "XL", action: false },
  { name: "XXL", action: false },
];
state.stor = 1;
export default {
  namespace: "Products",
  state,
  reducers: {
    selected(state, { payload }) {
      state.size.map((item) => {
        if (item.name === payload) {
          item.action = !item.action;
        }
      });
      return {
        ...state,
      };
    },
    stor(state, { payload }) {
      state.stor = payload;
      return { ...state };
    },
    InitializeData(state, { payload }) {
      return {
        ...state,
        products: payload,
      };
    },
    clearData(state, { payload }) {
      return {
        ...state,
        products: payload,
      };
    },
    screening(state, { payload }) {
      let selected = [];
      let newProducts = [];
      state.size.forEach((item) => {
        if (item.action) {
          selected.push(item.name);
        }
      });
      if (selected.length > 0) {
        state.products.forEach((item) => {
          selected.forEach((select) => {
            if (
              item.availableSizes.indexOf(select) !== -1 &&
              newProducts.indexOf(item) === -1 &&
              select
            ) {
              newProducts.push(item);
            }
          });
        });
      } else {
        newProducts = state.products;
      }
      if (state.stor === 2) {
        newProducts = newProducts.sort((a, b) => a.price - b.price);
      } else if (state.stor === 3) {
        newProducts = newProducts.sort((a, b) => b.price - a.price);
      }
      return {
        ...state,
        products: newProducts,
      };
    },
  },
  effects: {
    *Initialize(action, { put, call }) {
      yield put({ type: "clearData", payload: [] });
      const response = yield call(getProducts, action);

      if (action.payload && action.payload.type) {
        yield put({
          type: action.payload.type,
          payload: action.payload.payload,
        });
      }

      yield put({ type: "InitializeData", payload: response.data?.products });
      yield put({ type: "screening", payload: response.data?.products });
    },
  },
};
