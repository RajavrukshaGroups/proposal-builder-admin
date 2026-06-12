import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/adminLayout";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
const ProposalTemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [terms, setTerms] = useState([]);

  const [templateName, setTemplateName] = useState("");
  const [coverTitle, setCoverTitle] = useState("");
  const [coverSubtitle, setCoverSubtitle] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [timelineContent, setTimelineContent] = useState("");

  const [includeServices, setIncludeServices] = useState(true);
  const [includePricing, setIncludePricing] = useState(true);
  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [includeTerms, setIncludeTerms] = useState(true);

  const [selectedTerms, setSelectedTerms] = useState([]);
  const [editModal, setEditModal] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [editTemplateName, setEditTemplateName] = useState("");

  const [editCoverTitle, setEditCoverTitle] = useState("");

  const [editCoverSubtitle, setEditCoverSubtitle] = useState("");

  const [editAboutCompany, setEditAboutCompany] = useState("");
  const [editTimelineContent, setEditTimelineContent] = useState("");

  const [editSelectedTerms, setEditSelectedTerms] = useState([]);

  const [editIncludeServices, setEditIncludeServices] = useState(true);

  const [editIncludePricing, setEditIncludePricing] = useState(true);

  const [editIncludeTimeline, setEditIncludeTimeline] = useState(true);

  const [editIncludeTerms, setEditIncludeTerms] = useState(true);

  const fetchTemplates = async () => {
    try {
      const res = await api.get("/api/proposal-template/all-templates");

      setTemplates(res.data.templates);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTerms = async () => {
    try {
      const res = await api.get("/api/term/all-terms");

      setTerms(res.data.terms);
    } catch (err) {
      console.log(err);
    }
  };
  const createTemplate = async () => {
    try {
      await api.post("/api/proposal-template/create-template", {
        templateName,
        coverTitle,
        coverSubtitle,
        timelineContent,
        aboutCompany,
        includeServices,
        includePricing,
        includeTimeline,
        includeTerms,
        selectedTerms,
      });

      toast.success("Template Created");

      setTemplateName("");
      setCoverTitle("");
      setCoverSubtitle("");
      setAboutCompany("");
      setTimelineContent("");

      setSelectedTerms([]);

      fetchTemplates();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create template");
    }
  };
  const deleteTemplate = async (id) => {
    const confirmDelete = window.confirm("Delete this template?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/proposal-template/delete-template/${id}`);

      toast.success("Template deleted");

      fetchTemplates();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete template");
    }
  };
  const handleEditClick = (template) => {
    setSelectedTemplate(template);

    setEditTemplateName(template.templateName);

    setEditCoverTitle(template.coverTitle);

    setEditCoverSubtitle(template.coverSubtitle);

    setEditAboutCompany(template.aboutCompany);
    setEditTimelineContent(template.timelineContent);

    setEditIncludeServices(template.includeServices);

    setEditIncludePricing(template.includePricing);

    setEditIncludeTimeline(template.includeTimeline);

    setEditIncludeTerms(template.includeTerms);

    setEditSelectedTerms(template.selectedTerms?.map((t) => t._id) || []);

    setEditModal(true);
  };
  const updateTemplate = async () => {
    try {
      await api.put(
        `/api/proposal-template/update-template/${selectedTemplate._id}`,
        {
          templateName: editTemplateName,
          coverTitle: editCoverTitle,
          coverSubtitle: editCoverSubtitle,
          aboutCompany: editAboutCompany,
          timelineContent: editTimelineContent,
          includeServices: editIncludeServices,
          includePricing: editIncludePricing,
          includeTimeline: editIncludeTimeline,
          includeTerms: editIncludeTerms,

          selectedTerms: editSelectedTerms,
        },
      );

      toast.success("Template Updated");

      setEditModal(false);

      fetchTemplates();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update template");
    }
  };
  const handleTermChange = (id) => {
    if (selectedTerms.includes(id)) {
      setSelectedTerms(selectedTerms.filter((termId) => termId !== id));
    } else {
      setSelectedTerms([...selectedTerms, id]);
    }
  };
  useEffect(() => {
    fetchTemplates();
    fetchTerms();
  }, []);
  return (
    <>
      <AdminLayout>
        <div className="p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-white mb-6">
              Proposal Template Management
            </h1>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Template Name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />

              <input
                placeholder="Cover Title"
                value={coverTitle}
                onChange={(e) => setCoverTitle(e.target.value)}
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />

              <input
                placeholder="Cover Subtitle"
                value={coverSubtitle}
                onChange={(e) => setCoverSubtitle(e.target.value)}
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <textarea
              rows={5}
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
              placeholder="About Company"
              className="w-full mt-4 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
            <textarea
              rows={4}
              value={timelineContent}
              onChange={(e) => setTimelineContent(e.target.value)}
              placeholder="Timeline Content"
              className="w-full mt-4 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <label className="text-white flex gap-2">
                <input
                  type="checkbox"
                  checked={includeServices}
                  onChange={(e) => setIncludeServices(e.target.checked)}
                />
                Services
              </label>

              <label className="text-white flex gap-2">
                <input
                  type="checkbox"
                  checked={includePricing}
                  onChange={(e) => setIncludePricing(e.target.checked)}
                />
                Pricing
              </label>

              <label className="text-white flex gap-2">
                <input
                  type="checkbox"
                  checked={includeTimeline}
                  onChange={(e) => setIncludeTimeline(e.target.checked)}
                />
                Timeline
              </label>

              <label className="text-white flex gap-2">
                <input
                  type="checkbox"
                  checked={includeTerms}
                  onChange={(e) => setIncludeTerms(e.target.checked)}
                />
                Terms
              </label>
            </div>
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-3">Select Terms</h3>

              <div className="grid md:grid-cols-2 gap-2">
                {terms.map((term) => (
                  <label key={term._id} className="text-slate-300 flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTerms.includes(term._id)}
                      onChange={() => handleTermChange(term._id)}
                    />

                    {term.title}
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={createTemplate}
              className="
    mt-6
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
              Create Template
            </button>
            <div className="overflow-x-auto mt-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="p-3 text-slate-300">Template</th>

                    <th className="p-3 text-slate-300">Terms</th>

                    <th className="p-3 text-slate-300">Status</th>

                    <th className="p-3 text-slate-300">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {templates.map((template) => (
                    <tr
                      key={template._id}
                      className="border-b border-slate-800"
                    >
                      <td className="p-3 text-white">
                        {template.templateName}
                      </td>

                      <td className="p-3 text-slate-300">
                        {template.selectedTerms
                          ?.map((term) => term.title)
                          .join(", ")}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            template.active
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {template.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditClick(template)}
                            className="p-2 rounded-lg bg-blue-500/20 text-blue-400"
                          >
                            <FiEdit2 />
                          </button>

                          <button
                            onClick={() => deleteTemplate(template._id)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400"
                          >
                            <FiTrash2 />
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
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold text-white mb-5">
                Edit Template
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={editTemplateName}
                  onChange={(e) => setEditTemplateName(e.target.value)}
                  placeholder="Template Name"
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />

                <input
                  value={editCoverTitle}
                  onChange={(e) => setEditCoverTitle(e.target.value)}
                  placeholder="Cover Title"
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />

                <input
                  value={editCoverSubtitle}
                  onChange={(e) => setEditCoverSubtitle(e.target.value)}
                  placeholder="Cover Subtitle"
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <textarea
                rows={5}
                value={editAboutCompany}
                onChange={(e) => setEditAboutCompany(e.target.value)}
                placeholder="About Company"
                className="w-full mt-4 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
              <textarea
                rows={4}
                value={editTimelineContent}
                onChange={(e) => setEditTimelineContent(e.target.value)}
                placeholder="Timeline Content"
                className="w-full mt-4 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
              <div className="mt-4">
                <h3 className="text-white font-semibold mb-3">Select Terms</h3>

                <div className="grid md:grid-cols-2 gap-2">
                  {terms.map((term) => (
                    <label key={term._id} className="text-slate-300 flex gap-2">
                      <input
                        type="checkbox"
                        checked={editSelectedTerms.includes(term._id)}
                        onChange={() => {
                          if (editSelectedTerms.includes(term._id)) {
                            setEditSelectedTerms(
                              editSelectedTerms.filter((id) => id !== term._id),
                            );
                          } else {
                            setEditSelectedTerms([
                              ...editSelectedTerms,
                              term._id,
                            ]);
                          }
                        }}
                      />

                      {term.title}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 mt-6">
                <label className="text-white flex gap-2">
                  <input
                    type="checkbox"
                    checked={editIncludeServices}
                    onChange={(e) => setEditIncludeServices(e.target.checked)}
                  />
                  Services
                </label>

                <label className="text-white flex gap-2">
                  <input
                    type="checkbox"
                    checked={editIncludePricing}
                    onChange={(e) => setEditIncludePricing(e.target.checked)}
                  />
                  Pricing
                </label>

                <label className="text-white flex gap-2">
                  <input
                    type="checkbox"
                    checked={editIncludeTimeline}
                    onChange={(e) => setEditIncludeTimeline(e.target.checked)}
                  />
                  Timeline
                </label>

                <label className="text-white flex gap-2">
                  <input
                    type="checkbox"
                    checked={editIncludeTerms}
                    onChange={(e) => setEditIncludeTerms(e.target.checked)}
                  />
                  Terms
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={updateTemplate}
                  className="px-6 py-3 rounded-xl bg-green-600 text-white"
                >
                  Update
                </button>

                <button
                  onClick={() => setEditModal(false)}
                  className="px-6 py-3 rounded-xl bg-red-600 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default ProposalTemplateManagement;
