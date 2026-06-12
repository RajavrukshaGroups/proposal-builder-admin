import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/adminLayout";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const SettingsManagement = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    logo: "",
    gstNumber: "",
    contactEmail: "",
    contactPhone: "",
    whatsappNumber: "",
    website: "",
    address: "",

    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",

    primaryColor: "#22D3EE",
    secondaryColor: "#F97316",

    emailSignature: "",
  });

  const fetchSettings = async () => {
    try {
      const res = await api.get("/api/settings/get-settings");

      if (res.data.settings) {
        setFormData(res.data.settings);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveSettings = async () => {
    try {
      await api.put("/api/settings/update-settings", formData);

      toast.success("Settings Updated Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save settings");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-white mb-6">
            Agency Settings
          </h1>

          {/* Agency Details */}
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">
            Agency Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <input
              name="agencyName"
              value={formData.agencyName}
              onChange={handleChange}
              placeholder="Agency Name"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="Logo URL"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="GST Number"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="Contact Email"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="Contact Phone"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="WhatsApp Number"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Address */}
          <textarea
            rows={4}
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Agency Address"
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-8"
          />

          {/* Bank Details */}
          <h2 className="text-lg font-semibold text-orange-400 mb-4">
            Bank Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <input
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Bank Name"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Account Number"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="IFSC Code"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />

            <input
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              placeholder="Branch Name"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Branding */}
          <h2 className="text-lg font-semibold text-green-400 mb-4">
            Branding
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-white mb-2">Primary Color</label>

              <input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                className="w-full h-12 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Secondary Color</label>

              <input
                type="color"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleChange}
                className="w-full h-12 rounded-lg"
              />
            </div>
          </div>

          {/* Email Signature */}
          <h2 className="text-lg font-semibold text-purple-400 mb-4">
            Email Signature
          </h2>

          <textarea
            rows={5}
            name="emailSignature"
            value={formData.emailSignature}
            onChange={handleChange}
            placeholder="Email Signature"
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          <button
            onClick={saveSettings}
            className="
              mt-8
              px-8
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
            Save Settings
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsManagement;
