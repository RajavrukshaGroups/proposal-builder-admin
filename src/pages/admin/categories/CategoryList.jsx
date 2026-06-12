import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/adminLayout";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [editName, setEditName] = useState("");
  const [editOrder, setEditOrder] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/category/all-categories");

      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const createCategory = async () => {
    try {
      await api.post("/api/category/create-category", {
        name,
        displayOrder,
      });

      toast.success("Category created");

      setName("");
      setDisplayOrder("");

      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    setSelectedCategory(category);

    setEditName(category.name);
    setEditOrder(category.displayOrder);

    setEditModal(true);
  };

  const updateCategory = async () => {
    try {
      await api.put(`/api/category/update-category/${selectedCategory._id}`, {
        name: editName,
        displayOrder: editOrder,
      });

      toast.success("Category updated");

      setEditModal(false);

      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update category");
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/category/delete-category/${id}`);

      toast.success("Category deleted");

      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-white mb-6">
            Service Categories
          </h1>

          {/* Form */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              type="number"
              placeholder="Display Order"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <button
              onClick={createCategory}
              className="
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-orange-500
                text-white
                font-semibold
              "
            >
              Add Category
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="p-3 text-slate-300">Name</th>
                  <th className="p-3 text-slate-300">Order</th>
                  <th className="p-3 text-slate-300">Status</th>
                  <th className="p-3 text-slate-300">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id} className="border-b border-slate-800">
                    <td className="p-3 text-white">{cat.name}</td>

                    <td className="p-3 text-slate-300">{cat.displayOrder}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          cat.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {cat.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEditClick(cat)}
                          className="
          p-2
          rounded-lg
          bg-blue-500/20
          text-blue-400
          hover:bg-blue-500/30
        "
                        >
                          <FiEdit2 size={16} />
                        </button>

                        <button
                          onClick={() => deleteCategory(cat._id)}
                          className="
          p-2
          rounded-lg
          bg-red-500/20
          text-red-400
          hover:bg-red-500/30
        "
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-white">
                Edit Category
              </h2>

              <button
                onClick={() => setEditModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-slate-800
            border
            border-slate-700
            text-white
          "
              />

              <input
                type="number"
                value={editOrder}
                onChange={(e) => setEditOrder(e.target.value)}
                className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-slate-800
            border
            border-slate-700
            text-white
          "
              />

              <button
                onClick={updateCategory}
                className="
            w-full
            py-3
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-orange-500
            text-white
            font-semibold
          "
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default CategoryList;
