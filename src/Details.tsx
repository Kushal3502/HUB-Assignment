import { FaFileAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoArrowBack, IoDocumentTextOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";

interface FormData {
  participants: string;
  dateTime: string;
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

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header - Same as Form */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 border-b border-b-gray-300 px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-semibold transition whitespace-nowrap"
        >
          <IoArrowBack size={18} />
          Back to Form
        </button>
      </div>

      {/* Success Banner */}
      <div className="bg-green-50 border-l-4 border-green-500 px-4 sm:px-6 md:px-8 py-3 mx-4 sm:mx-6 md:mx-8 mt-4 rounded-sm">
        <div className="flex items-center gap-3">
          <FaCircleCheck className=" bg-green-500 rounded-full"/>
          <div>
            <h3 className="font-semibold text-green-900 text-sm">
              MOM Submitted Successfully
            </h3>
            <p className="text-xs text-green-700">
              Your meeting minutes have been recorded and saved.
            </p>
          </div>
        </div>
      </div>

      {/* Content - Same layout as Form */}
      <div className="px-4 sm:px-6 md:px-8 py-4 space-y-5">
        {/* Meeting Participants and Date/Time - Same grid as Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Meeting Participants
            </label>
            <div className="w-full bg-gray-50 border border-gray-300 rounded-sm px-4 py-2 text-sm text-gray-700 min-h-[60px]">
              {data.participants || "Not provided"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Date/Time
            </label>
            <div className="w-full bg-gray-100 border border-gray-300 rounded-sm px-4 py-2 text-sm text-gray-700">
              {data.dateTime || "Not provided"}
            </div>
          </div>
        </div>

        {/* Minutes of Meeting */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-base font-semibold text-gray-900">
              Minutes of the Meeting (MOM)
            </label>
          </div>

          <div className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm text-gray-700 min-h-[200px] whitespace-pre-wrap">
            {data.minutes || "No minutes provided"}
          </div>
        </div>

        {/* Reference Images Section */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            Reference Images / Markups / Screenshots
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            Attached visual proof discussed during the meeting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Show images in slots or empty slots */}
            {[0, 1].map((slotIndex) => {
              const file = data.images?.[slotIndex];
              
              return (
                <div
                  key={slotIndex}
                  className="border border-gray-200 rounded-lg p-2 flex flex-col items-center justify-center bg-gray-50 min-h-[180px] relative"
                >
                  {file ? (
                    <div className="w-full h-full">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <IoDocumentTextOutline
                            size={40}
                            className="text-blue-500 mb-2"
                          />
                          <p className="text-xs text-gray-600 font-medium text-center px-2">
                            {file.name}
                          </p>
                        </div>
                      )}
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
              );
            })}
          </div>

          {/* Additional images indicator */}
          {data.images && data.images.length > 3 && (
            <div className="mt-4 text-sm text-gray-600">
              + {data.images.length - 3} more file(s) attached
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
}

export default Details;

