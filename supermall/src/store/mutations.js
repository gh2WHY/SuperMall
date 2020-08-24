export default{
  //mutations唯一的目的就是修改state的值
  //mutations中的方法完成的工作尽可能的单一
  addCounter(state,payload) {
    payload.count += 1;
  },
  addToCart(state,payload) {
    payload.checked = false;
    state.cartList.push(payload)
  }, 
}