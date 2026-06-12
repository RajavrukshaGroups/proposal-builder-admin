import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/adminLayout";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const TermsManagement = () => {
  const [terms, setTerms] = useState([]);

  const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  const [content, setContent] = useState([""]);

  const [editModal, setEditModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  //   const [editContent, setEditContent] = useState("");
  const [editContent, setEditContent] = useState([]);
  const [editActive, setEditActive] = useState(true);

  // Fetch Terms
  const fetchTerms = async () => {
    try {
      const res = await api.get("/api/term/all-terms");

      setTerms(res.data.terms);
    } catch (err) {
      console.log(err);

      toast.error("Failed to fetch terms");
    }
  };

  // Create Term
  const createTerm = async () => {
    try {
      if (
        !title.trim() ||
        content.length === 0 ||
        content.every((item) => !item.trim())
      ) {
        return toast.error("Title and Content are required");
      }

      //   await api.post("/api/term/create-term", {
      //     title,
      //     content,
      //   });
      await api.post("/api/term/create-term", {
        title,
        content: content.filter((item) => item.trim() !== ""),
      });

      toast.success("Term created successfully");

      setTitle("");
      setContent([""]);

      fetchTerms();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create term");
    }
  };

  // Open Edit Modal
  const handleEditClick = (term) => {
    setSelectedTerm(term);

    setEditTitle(term.title);
    // setEditContent(term.content);
    setEditContent(Array.isArray(term.content) ? term.content : [term.content]);
    setEditActive(term.active);

    setEditModal(true);
  };

  // Update Term
  const updateTerm = async () => {
    try {
      await api.put(`/api/term/update-term/${selectedTerm._id}`, {
        title: editTitle,
        content: editContent.filter((item) => item.trim() !== ""),
        active: editActive,
      });

      toast.success("Term updated successfully");

      setEditModal(false);

      fetchTerms();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update term");
    }
  };

  // Delete Term
  const deleteTerm = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this term?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/term/delete-term/${id}`);

      toast.success("Term deleted successfully");

      fetchTerms();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete term");
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const addContentRow = () => {
    setContent([...content, ""]);
  };

  const updateContent = (index, value) => {
    const updated = [...content];

    updated[index] = value;

    setContent(updated);
  };

  const removeContent = (index) => {
    const updated = content.filter((_, i) => i !== index);

    setContent(updated);
  };

  const addEditContentRow = () => {
    setEditContent([...editContent, ""]);
  };

  const updateEditContent = (index, value) => {
    const updated = [...editContent];

    updated[index] = value;

    setEditContent(updated);
  };

  const removeEditContent = (index) => {
    const updated = editContent.filter((_, i) => i !== index);

    setEditContent(updated);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          {/* Header */}
          <h1 className="text-2xl font-bold text-white mb-6">
            Terms & Conditions Management
          </h1>

          {/* Create Form */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Term Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <div className="space-y-3">
              {content.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    placeholder={`Content ${index + 1}`}
                    onChange={(e) => updateContent(index, e.target.value)}
                    className="
          flex-1
          px-4
          py-3
          rounded-xl
          bg-slate-800
          border
          border-slate-700
          text-white
        "
                  />

                  {content.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContent(index)}
                      className="
            px-3
            rounded-xl
            bg-red-500
            text-white
          "
                    >
                      X
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addContentRow}
                className="
      px-4
      py-2
      rounded-xl
      bg-cyan-500
      text-white
    "
              >
                + Add Content
              </button>
            </div>
          </div>

          <button
            onClick={createTerm}
            className="
              mb-8
              px-6
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
            Add Term
          </button>

          {/* Terms Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="p-3 text-slate-300">Title</th>
                  <th className="p-3 text-slate-300">Content</th>
                  <th className="p-3 text-slate-300">Status</th>
                  <th className="p-3 text-slate-300">Actions</th>
                </tr>
              </thead>

              <tbody>
                {terms.map((term) => (
                  <tr key={term._id} className="border-b border-slate-800">
                    <td className="p-3 text-white">{term.title}</td>

                    <td className="p-3 text-slate-300">
                      <ul className="list-disc ml-4">
                        {Array.isArray(term.content) ? (
                          term.content.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        ) : (
                          <li>{term.content}</li>
                        )}
                      </ul>
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          term.active
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {term.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(term)}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          onClick={() => deleteTerm(term._id)}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {terms.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-slate-400 py-8">
                      No Terms Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Edit Term</h2>

                <button
                  onClick={() => setEditModal(false)}
                  className="text-slate-400 hover:text-red-400"
                >
                  <FiX size={22} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-2">Title</label>

                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Content</label>

                  <div className="space-y-3">
                    {editContent.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          placeholder={`Content ${index + 1}`}
                          onChange={(e) =>
                            updateEditContent(index, e.target.value)
                          }
                          className="
            flex-1
            px-4
            py-3
            rounded-xl
            bg-slate-800
            border
            border-slate-700
            text-white
          "
                        />

                        {editContent.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEditContent(index)}
                            className="
              px-3
              rounded-xl
              bg-red-500
              text-white
            "
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addEditContentRow}
                      className="
        px-4
        py-2
        rounded-xl
        bg-cyan-500
        text-white
      "
                    >
                      + Add Content
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Status</label>

                  <select
                    value={editActive}
                    onChange={(e) => setEditActive(e.target.value === "true")}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>

                <button
                  onClick={updateTerm}
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
                  Update Term
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TermsManagement;
