import { createContext, useContext, useState } from "react";
import { products as initialProducts, categories } from "./data";

const ProductContext = createContext();

// Versi dummy (tanpa API): data disimpan di state. Nama fungsi sama dengan versi API
// (products, addProduct, updateProduct, deleteProduct, getCategories) sehingga mudah diganti nanti.
export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  // Slug dipakai di URL detail produk: tidak boleh kosong dan tidak boleh kembar
  const uniqueSlug = (name, id, list) => {
    const base = slugify(name) || `produk-${id}`;
    return list.some((p) => p.slug === base && p.id !== id) ? `${base}-${id}` : base;
  };
  const withCategory = (d) => ({
    ...d,
    category: Number(d.category),
    category_name: categories.find((c) => c.id === Number(d.category))?.name ?? "",
  });

  const addProduct = (data) =>
    setProducts((prev) => {
      const id = Math.max(0, ...prev.map((p) => p.id)) + 1;
      return [
        { emoji: "📦", bg: "bg-slate-200", store: "Toko Saya", rating: 0, sold: 0, oldPrice: null, ...withCategory(data),
          id, slug: uniqueSlug(data.name, id, prev) },
        ...prev,
      ];
    });

  const updateProduct = (id, data) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...withCategory(data), slug: uniqueSlug(data.name, id, prev) } : p)));

  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));
  const getCategories = () => categories;

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getCategories }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
