import { FaCircleCheck } from "react-icons/fa6";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  IoArrowBack,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoPeopleOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import { FaFileAlt } from "react-icons/fa";

interface FormData {
  participants: string;
  date: string;
  startTime: string;
  endTime: string;
  minutes: string;
  images: File[];
}

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as FormData;

  // If no data, redirect back
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Data Available
          </h2>
          <p className="text-gray-600 mb-6">
            Please submit the form to view details.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Not provided";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "Not provided";
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 rounded-sm">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition"
          >
            <IoArrowBack size={18} />
            Back to Form
          </button>
        </div>

        {/* Success Banner */}
        <div className="bg-white border border-gray-200 rounded-sm mb-6 px-6 py-4">
          <div className="flex items-center gap-3">
            <FaCircleCheck className="text-green-600" size={20} />
            <div>
              <h3 className="font-semibold text-gray-900">
                MOM Submitted Successfully
              </h3>
              <p className="text-sm text-gray-600">
                Your meeting minutes have been recorded and saved.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-gray-200 rounded-sm">
          {/* Document Header */}
          <div className="border-b border-gray-200 px-6 py-3">
            <div className="flex items-center gap-3">
              <FaFileAlt className="text-blue-500" size={24} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Minutes of Meeting
                </h1>
                <p className="text-sm text-gray-500">
                  Official Meeting Documentation
                </p>
              </div>
            </div>
          </div>

          {/* Meeting Info */}
          <div className="p-6 space-y-4">
            {/* Date & Time Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date */}
              <div className="border border-gray-200 rounded-sm p-4">
                <div className="flex items-start gap-3">
                  <IoCalendarOutline
                    className="text-gray-600 mt-0.5"
                    size={20}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Meeting Date
                    </p>
                    <p className="text-gray-900 font-medium">
                      {formatDate(data.date)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="border border-gray-200 rounded-sm p-4">
                <div className="flex items-start gap-3">
                  <IoTimeOutline className="text-gray-600 mt-0.5" size={20} />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Meeting Time
                    </p>
                    <p className="text-gray-900 font-medium">
                      {formatTime(data.startTime)} - {formatTime(data.endTime)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">GMT +5:30</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="border border-gray-200 rounded-sm p-4">
              <div className="flex items-start gap-3">
                <IoPeopleOutline className="text-gray-600 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Meeting Participants
                  </p>
                  <p className="text-gray-900 leading-relaxed">
                    {data.participants || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Minutes Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <IoDocumentTextOutline className="text-gray-600" size={20} />
                <h2 className="text-base font-bold text-gray-900">
                  Meeting Minutes
                </h2>
              </div>
              <div className="bg-gray-50 rounded-sm p-4 border border-gray-200">
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {data.minutes || "No minutes provided"}
                </p>
              </div>
            </div>

            {/* Reference Images Section */}
            {data.images && data.images.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <HiOutlinePhotograph className="text-gray-600" size={20} />
                  <h2 className="text-base font-bold text-gray-900">
                    Reference Materials
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Visual proof and documentation from the meeting
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.images.map((file, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-sm overflow-hidden bg-white hover:border-gray-300 transition"
                    >
                      {file.type.startsWith("image/") ? (
                        <div className="relative aspect-video bg-gray-100">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-2">
                            <p className="text-xs text-white font-medium truncate">
                              {file.name}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video flex flex-col items-center justify-center bg-gray-50 p-4">
                          <IoDocumentTextOutline
                            size={40}
                            className="text-gray-400 mb-2"
                          />
                          <p className="text-xs text-gray-700 font-medium text-center">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF Document
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
