import React, { useState, useRef } from "react";
import { MdLockClock } from "react-icons/md";
import { FiUploadCloud, FiInfo, FiX } from "react-icons/fi";
import { IoDocumentTextOutline, IoShieldCheckmark } from "react-icons/io5";
import { HiOutlinePhotograph } from "react-icons/hi";
import "./App.css";
import { useNavigate } from "react-router";
import { FaFileAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

interface FormData {
  participants: string;
  dateTime: string;
  minutes: string;
  images: File[];
}

function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    participants: "",
    dateTime: "",
    minutes: "",
    images: [],
  });

  const [error, setError] = useState<string | null>(null);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const previewPromises: Promise<string>[] = [];

    fileArray.forEach((file) => {
      // Validate file type and size
      if (
        (file.type.startsWith("image/") || file.type === "application/pdf") &&
        file.size <= 10 * 1024 * 1024 // 10MB
      ) {
        validFiles.push(file);

        // Create preview promise
        const previewPromise = new Promise<string>((resolve) => {
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          } else {
            // For PDFs, return a placeholder
            resolve("pdf");
          }
        });

        previewPromises.push(previewPromise);
      }
    });

    // Wait for all previews to load
    if (validFiles.length > 0) {
      const newPreviews = await Promise.all(previewPromises);

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));

      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.minutes.trim()) {
      setError("Please fill in the Minutes of Meeting field");
      return;
    }

    console.log(imagePreviews);

    // Log form data (in real app, this would be sent to backend)
    console.log("Form submitted:", {
      participants: formData.participants,
      dateTime: formData.dateTime,
      minutes: formData.minutes,
      imageCount: formData.images.length,
      images: formData.images,
    });

    alert("MOM submitted successfully!");

    navigate("/details", {
      state: formData,
    });

    // Reset form
    setFormData({
      participants: "",
      dateTime: "",
      minutes: "",
      images: [],
    });
    setImagePreviews([]);
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All data will be lost.")) {
      setFormData({
        participants: "",
        dateTime: "",
        minutes: "",
        images: [],
      });
      setImagePreviews([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-sm"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 border-b border-b-gray-300 px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="">
          <div className=" flex justify-start items-center gap-1">
            <FaFileAlt className="w-4 h-4 text-blue-500" />
            <h1 className="text-base sm:text-lg font-bold text-gray-900">
              Minutes of Meeting (MOM)
            </h1>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Submit official meeting summary to unlock next project stage.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 sm:gap-2 bg-amber-100 text-amber-600 text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm hover:bg-orange-100 transition whitespace-nowrap"
        >
          <MdLockClock size={18} />
          STAGE EXIT LOCK
        </button>
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-4 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Meeting Participants
            </label>
            <textarea
              rows={2}
              name="participants"
              placeholder="John Doe (Client), Sarah Miller (Lead Architect), Mike Ross (PM)"
              value={formData.participants}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border border-gray-300 rounded-sm px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Date/Time
            </label>
            <input
              type="text"
              name="dateTime"
              placeholder="Oct 24, 2023 | 10:30 AM - 11:45 AM (GMT +5:30)"
              value={formData.dateTime}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-sm px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Minutes of Meeting */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-base font-semibold text-gray-900">
              Minutes of the Meeting (MOM)
            </label>
            <span className="text-sm text-gray-400">Required Field</span>
          </div>

          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

          <textarea
            name="minutes"
            value={formData.minutes}
            onChange={handleInputChange}
            rows={8}
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={`Example:
• Customer liked kitchen layout; requested granite countertop switch.
• Agreed on 15th Nov for next site visit.
• Budget ceiling confirmed at $45,000.`}
            required
          />

          <div className="flex items-start gap-2 text-xs text-gray-500 mt-1">
            <FiInfo className="mt-0.5 shrink-0" size={14} />
            <p className="italic">
              Please ensure all final decisions and client approvals are
              documented clearly for audit purposes.
            </p>
          </div>
        </div>

        {/* Reference Images Section */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            Reference Images / Markups / Screenshots
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            Attach visual proof discussed during the meeting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Upload Box */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition cursor-pointer min-h-[180px] ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
              }`}
            >
              <FiUploadCloud size={40} className="text-gray-400 mb-3" />
              <p className="font-semibold text-gray-700 text-sm mb-1">
                Drag & drop files
              </p>
              <p className="text-xs text-gray-400">JPG, PNG, PDF up to 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* Image Slots with Previews */}
            {[0, 1].map((slotIndex) => (
              <div
                key={slotIndex}
                className="border border-gray-200 rounded-lg p-2 flex flex-col items-center justify-center bg-gray-50 min-h-45 relative"
              >
                {imagePreviews[slotIndex] ? (
                  <div className="w-full h-full">
                    {imagePreviews[slotIndex] === "pdf" ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <IoDocumentTextOutline
                          size={40}
                          className="text-blue-500 mb-2"
                        />
                        <p className="text-xs text-gray-600 font-medium">
                          {formData.images[slotIndex]?.name}
                        </p>
                      </div>
                    ) : (
                      <img
                        src={imagePreviews[slotIndex]}
                        alt={`Preview ${slotIndex + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(slotIndex)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <HiOutlinePhotograph
                      size={40}
                      className="text-gray-300 mb-2"
                    />
                    <p className="text-sm text-gray-400 font-medium">
                      SLOT {slotIndex + 1}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Additional images indicator */}
          {formData.images.length > 2 && (
            <div className="mt-4 text-sm text-gray-600">
              + {formData.images.length - 2} more file(s) attached
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-t-gray-300 bg-gray-50 px-4 sm:px-6 md:px-8 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 rounded-b-lg">
        <div className="flex items-start gap-1 max-w-md text-left">
          <IoShieldCheckmark className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 flex-shrink-0" />
          <label
            htmlFor="legal-disclaimer"
            className="text-xs text-gray-500 leading-relaxed text-justify"
          >
            <span className="font-semibold ">LEGAL DISCLAIMER:</span> THIS MOM
            WILL BE TREATED AS OFFICIAL DESIGN DISCUSSION RECORD AND WILL BE
            USED AS THE PRIMARY REFERENCE FOR DISPUTE RESOLUTION OR STAGE
            SIGN-OFFS.
          </label>
        </div>

        <div className="flex gap-2 items-center w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer text-gray-700 border border-gray-700 rounded-sm font-semibold text-sm px-3 sm:px-4 py-2 hover:text-gray-900 hover:bg-gray-200 transition flex-1 sm:flex-none"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-3 sm:px-4 py-2 rounded-sm shadow-sm transition flex items-center justify-center gap-2 flex-1 sm:flex-none"
          >
            Share the MOM
            <IoMdSend />
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
