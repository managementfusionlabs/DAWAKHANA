export const getCart = () => {
  const c = localStorage.getItem("cart");
  return c ? JSON.parse(c) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (item) => {
  const cart = getCart();
  const existing = cart.find((c) => c.inventoryId === item.inventoryId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart(cart);
  return cart;
};

export const updateQty = (id, qty) => {
  const cart = getCart().map((c) =>
    c.inventoryId === id ? { ...c, qty } : c
  );
  saveCart(cart);
  return cart;
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((c) => c.inventoryId !== id);
  saveCart(cart);
  return cart;
};
