import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/adminLayout";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const PricingManagement = () => {
  const [services, setServices] = useState([]);
  const [pricingList, setPricingList] = useState([]);

  const [serviceId, setServiceId] = useState("");

  const [basicPrice, setBasicPrice] = useState("");
  const [growthPrice, setGrowthPrice] = useState("");
  const [premiumPrice, setPremiumPrice] = useState("");
  const [enterprisePrice, setEnterprisePrice] = useState("");

  const [discountAllowed, setDiscountAllowed] = useState(true);

  const [editModal, setEditModal] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState(null);

  const [editBasicPrice, setEditBasicPrice] = useState("");
  const [editGrowthPrice, setEditGrowthPrice] = useState("");
  const [editPremiumPrice, setEditPremiumPrice] = useState("");
  const [editEnterprisePrice, setEditEnterprisePrice] = useState("");

  const [editDiscountAllowed, setEditDiscountAllowed] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await api.get("/api/service/all-services");

      setServices(res.data.services);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPricing = async () => {
    try {
      const res = await api.get("/api/pricing/all-pricing");

      setPricingList(res.data.pricing);
    } catch (err) {
      console.log(err);
    }
  };

  const createPricing = async () => {
    try {
      await api.post("/api/pricing/create-pricing", {
        serviceId,
        basicPrice,
        growthPrice,
        premiumPrice,
        enterprisePrice,
        discountAllowed,
      });

      toast.success("Pricing created successfully");

      setServiceId("");
      setBasicPrice("");
      setGrowthPrice("");
      setPremiumPrice("");
      setEnterprisePrice("");
      setDiscountAllowed(true);

      fetchPricing();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create pricing");
    }
  };

  const handleEdit = (pricing) => {
    setSelectedPricing(pricing);

    setEditBasicPrice(pricing.basicPrice);
    setEditGrowthPrice(pricing.growthPrice);
    setEditPremiumPrice(pricing.premiumPrice);
    setEditEnterprisePrice(pricing.enterprisePrice);

    setEditDiscountAllowed(pricing.discountAllowed);

    setEditModal(true);
  };

  const updatePricing = async () => {
    try {
      await api.put(`/api/pricing/update-pricing/${selectedPricing._id}`, {
        basicPrice: editBasicPrice,
        growthPrice: editGrowthPrice,
        premiumPrice: editPremiumPrice,
        enterprisePrice: editEnterprisePrice,
        discountAllowed: editDiscountAllowed,
      });

      toast.success("Pricing updated successfully");

      setEditModal(false);

      fetchPricing();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update pricing");
    }
  };

  const deletePricing = async (id) => {
    if (!window.confirm("Delete this pricing setup?")) return;

    try {
      await api.delete(`/api/pricing/delete-pricing/${id}`);

      toast.success("Pricing deleted");

      fetchPricing();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete pricing");
    }
  };

  useEffect(() => {
    fetchServices();
    fetchPricing();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-white mb-6">
            Pricing Management
          </h1>

          {/* CREATE FORM */}
          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            >
              <option value="">Select Service</option>

              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.serviceName}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Basic Price"
              value={basicPrice}
              onChange={(e) => setBasicPrice(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              type="number"
              placeholder="Growth Price"
              value={growthPrice}
              onChange={(e) => setGrowthPrice(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              type="number"
              placeholder="Premium Price"
              value={premiumPrice}
              onChange={(e) => setPremiumPrice(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              type="number"
              placeholder="Enterprise Price"
              value={enterprisePrice}
              onChange={(e) => setEnterprisePrice(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={discountAllowed}
                onChange={(e) => setDiscountAllowed(e.target.checked)}
              />

              <span className="text-white">Discount Allowed</span>
            </div>
          </div>

          <button
            onClick={createPricing}
            className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-orange-500
              text-white
              font-semibold
              mb-8
            "
          >
            Save Pricing
          </button>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="p-3 text-slate-300">Service</th>
                  <th className="p-3 text-slate-300">Category</th>
                  <th className="p-3 text-slate-300">Basic</th>
                  <th className="p-3 text-slate-300">Growth</th>
                  <th className="p-3 text-slate-300">Premium</th>
                  <th className="p-3 text-slate-300">Enterprise</th>
                  <th className="p-3 text-slate-300">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pricingList.map((pricing) => (
                  <tr key={pricing._id} className="border-b border-slate-800">
                    <td className="p-3 text-white">
                      {pricing.serviceId?.serviceName}
                    </td>

                    <td className="p-3 text-slate-300">
                      {pricing.serviceId?.categoryId?.name}
                    </td>

                    <td className="p-3 text-slate-300">
                      ₹{pricing.basicPrice}
                    </td>

                    <td className="p-3 text-slate-300">
                      ₹{pricing.growthPrice}
                    </td>

                    <td className="p-3 text-slate-300">
                      ₹{pricing.premiumPrice}
                    </td>

                    <td className="p-3 text-slate-300">
                      ₹{pricing.enterprisePrice}
                    </td>

                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(pricing)}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          onClick={() => deletePricing(pricing._id)}
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

        {/* EDIT MODAL */}
        {editModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-6">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Edit Pricing
                </h2>

                <button onClick={() => setEditModal(false)}>
                  <FiX className="text-white text-xl" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Basic Price
                  </label>

                  <input
                    type="number"
                    value={editBasicPrice}
                    onChange={(e) => setEditBasicPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Growth Price
                  </label>

                  <input
                    type="number"
                    value={editGrowthPrice}
                    onChange={(e) => setEditGrowthPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Premium Price
                  </label>

                  <input
                    type="number"
                    value={editPremiumPrice}
                    onChange={(e) => setEditPremiumPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Enterprise Price
                  </label>

                  <input
                    type="number"
                    value={editEnterprisePrice}
                    onChange={(e) => setEditEnterprisePrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    checked={editDiscountAllowed}
                    onChange={(e) => setEditDiscountAllowed(e.target.checked)}
                    className="w-4 h-4"
                  />

                  <label className="text-slate-300">Discount Allowed</label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setEditModal(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={updatePricing}
                    className="
        flex-1
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
                    Update Pricing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PricingManagement;
