// 获取初始值
let getGoodsList = () => {
  let goodsList = localStorage.getItem("goodsList")
    ? JSON.parse(localStorage.getItem("goodsList"))
    : [];
  return goodsList;
};
// 添加到购物车
let addGoodsList = (action) => {
  let goodsList = localStorage.getItem("goodsList")
    ? JSON.parse(localStorage.getItem("goodsList"))
    : [];
  let idList = goodsList.map((item) => {
    return item.id;
  });
  if (goodsList.length === 0 || idList.indexOf(action.id) === -1) {
    action.num = 1;
    goodsList.push(action);
  } else {
    goodsList.forEach((item) => {
      if (item.id === action.id) {
        item.num += 1;
      }
    });
  }
  localStorage.setItem("goodsList", JSON.stringify(goodsList));
  return goodsList;
};
// 删除购物车商品
let deleteGoodsList = (action) => {
  let goodsList = localStorage.getItem("goodsList")
    ? JSON.parse(localStorage.getItem("goodsList"))
    : [];
  if (goodsList.length === 1) {
    localStorage.removeItem("goodsList");
    return [];
  }
  goodsList.forEach((item, index) => {
    if (item.id === action.id) {
      goodsList.splice(index, 1);
    }
  });
  localStorage.setItem("goodsList", JSON.stringify(goodsList));

  return goodsList;
};
// 购物车商品减法
let reductionGoods = (action) => {
  let goodsList = localStorage.getItem("goodsList")
    ? JSON.parse(localStorage.getItem("goodsList"))
    : [];
  goodsList.forEach((item) => {
    if (item.id === action.id) {
      item.num -= 1;
    }
  });
  localStorage.setItem("goodsList", JSON.stringify(goodsList));
  return goodsList;
};
// 购物车商品加法
let addGoods = (action) => {
  let goodsList = localStorage.getItem("goodsList")
    ? JSON.parse(localStorage.getItem("goodsList"))
    : [];
  goodsList.forEach((item) => {
    if (item.id === action.id) {
      item.num += 1;
    }
  });
  localStorage.setItem("goodsList", JSON.stringify(goodsList));
  return goodsList;
};
// 清空购物车
let emptyGoodsList = () => {
  localStorage.removeItem("goodsList");
  return [];
};
export default {
  namespace: "Cart",
  state: getGoodsList(),
  reducers: {
    storage(state, { payload }) {
      return [...payload];
    },
  },
  effects: {
    *pushGoods(action, { put, call }) {
      const response = yield call(addGoodsList, action.payload);
      yield put({ type: "storage", payload: response });
    },
    *deleteGoods(action, { put, call }) {
      const response = yield call(deleteGoodsList, action.payload);
      yield put({ type: "storage", payload: response });
    },
    *reduction(action, { put, call }) {
      const response = yield call(reductionGoods, action.payload);
      yield put({ type: "storage", payload: response });
    },
    *add(action, { put, call }) {
      const response = yield call(addGoods, action.payload);
      yield put({ type: "storage", payload: response });
    },
    *empty(action, { put, call }) {
      const response = yield call(emptyGoodsList, action.payload);
      yield put({ type: "storage", payload: response });
    },
  },
};
