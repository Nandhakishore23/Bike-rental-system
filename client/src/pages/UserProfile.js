// import React, { useState, useEffect } from "react";
import React, { useState} from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { userUpdate } from "../redux/actions/userActions";
import Spinner from "../components/Spinner";
import {
    User,
    MapPin,
    Phone,
    ShieldCheck,
    AlertTriangle,
    CreditCard,
    Save,
    CheckCircle,
    FileText
} from "lucide-react";

function UserProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alertsReducer);

    // Constants
    // In a real app, you'd upload the image to Cloudinary/S3 and get a URL back.
    // For this demo, we'll simulate it by just asking for a text URL or assume a placeholder if blank.

    const [formData, setFormData] = useState({
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        licenseUrl: user.licenseUrl || "",
        licenseNumber: user.licenseNumber || "",
        licenseExpiry: user.licenseExpiry || "",
        dob: user.dob || "",
        aadhaar: user.aadhaar || "",
        emergencyContact: user.emergencyContact || ""
    });

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function onUpdate(e) {
        e.preventDefault();
        dispatch(userUpdate(formData));
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}

            <div className="min-h-screen bg-zinc-950 pt-32 px-4 pb-20">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-12 animate-fade-up">
                        <h1 className="text-4xl md:text-5xl font-black text-white font-['Outfit'] mb-2">My Profile</h1>
                        <p className="text-zinc-400">Manage your personal details and verification status.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left: Personal Details Form */}
                        <div className="w-full lg:w-2/3 space-y-8 animate-fade-up animation-delay-100">
                            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <User className="text-yellow-500" /> Personal Details
                                </h2>

                                <form onSubmit={onUpdate} className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Username</label>
                                            <input
                                                type="text"
                                                value={formData.username}
                                                disabled
                                                className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email</label>
                                            <input
                                                type="text"
                                                value={formData.email}
                                                disabled
                                                className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Phone Number</label>
                                        <div className="relative">
                                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl pl-12 pr-4 py-3 text-white outline-none transition-all placeholder-zinc-700"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Address</label>
                                        <div className="relative">
                                            <MapPin size={18} className="absolute left-4 top-4 text-zinc-500" />
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl pl-12 pr-4 py-3 text-white outline-none transition-all placeholder-zinc-700 min-h-[100px]"
                                                placeholder="Enter your full address"
                                            />
                                        </div>
                                    </div>

                                    {/* New Personal Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Date of Birth</label>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Aadhaar / ID Proof</label>
                                            <input
                                                type="text"
                                                name="aadhaar"
                                                value={formData.aadhaar}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-zinc-700"
                                                placeholder="Ex: 1234 5678 9012"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Emergency Contact (Name & Phone)</label>
                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-zinc-700"
                                            placeholder="Ex: John Doe - 9876543210"
                                        />
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <h3 className="text-lg font-bold text-white mb-4">Driving License Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">License Number</label>
                                                <input
                                                    type="text"
                                                    name="licenseNumber"
                                                    value={formData.licenseNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-zinc-700"
                                                    placeholder="KA-01-2022-12345"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Expiry Date</label>
                                                <input
                                                    type="date"
                                                    name="licenseExpiry"
                                                    value={formData.licenseExpiry}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-zinc-700"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 flex justify-end">
                                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-all flex items-center gap-2">
                                            <Save size={18} /> Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right: Verification Status */}
                        <div className="w-full lg:w-1/3 space-y-6 animate-fade-up animation-delay-200">

                            {/* Status Card */}
                            <div className={`p-6 rounded-3xl border flex flex-col items-center text-center ${user.isVerified ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                {user.isVerified ? (
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
                                        <ShieldCheck size={32} />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 text-red-400">
                                        <AlertTriangle size={32} />
                                    </div>
                                )}

                                <h3 className={`text-xl font-bold mb-1 ${user.isVerified ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {user.isVerified ? "Verified Rider" : "Verification Pending"}
                                </h3>
                                <p className="text-zinc-400 text-sm">
                                    {user.isVerified
                                        ? "You are fully approved to book any vehicle in our fleet."
                                        : "Complete your profile and upload your license to get verified."}
                                </p>
                            </div>

                            {/* License Upload Section */}
                            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <CreditCard size={18} className="text-yellow-500" /> Driver's License
                                </h3>

                                <div className="space-y-4">
                                    <p className="text-xs text-zinc-500">
                                        Upload a clear picture of your valid Driver's License. Admins will verify this manually.
                                    </p>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Image URL</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-grow">
                                                <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                                <input
                                                    type="text"
                                                    name="licenseUrl"
                                                    value={formData.licenseUrl}
                                                    onChange={handleInputChange}
                                                    placeholder="https://..."
                                                    className="w-full bg-black/40 border border-zinc-800 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:border-yellow-500/50 outline-none"
                                                />
                                            </div>
                                            <button onClick={onUpdate} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-xl transition-colors">
                                                <CheckCircle size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Preview */}
                                    {formData.licenseUrl && (
                                        <div className="mt-4 rounded-xl overflow-hidden border border-zinc-700 bg-black h-40 relative group">
                                            <img
                                                src={formData.licenseUrl}
                                                alt="License Preview"
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className="bg-black/60 px-3 py-1 rounded-full text-xs text-white backdrop-blur-md">Preview</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </DefaultLayout>
    );
}

export default UserProfile;
