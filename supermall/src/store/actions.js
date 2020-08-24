
export default {
  addToCart(context,payload) {
    return new Promise((resolve) => {
      //查找之前的数组中是否已经有该产品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
  
    //判断这个商品是否已经存在,如果存在,则count加1,否则初始化count为1
    if(oldProduct) {
      // oldProduct.count += 1;
      context.commit('addCounter',oldProduct);
      resolve('当前商品数量+1')
    }else {
      payload.count = 1;
      // state.cartList.push(payload);
      context.commit('addToCart',payload);
      resolve('新的商品加入购物车成功')
    }
    })
  }
}

