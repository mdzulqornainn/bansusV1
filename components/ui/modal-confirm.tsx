import { LoaderIcon, TriangleAlert, X } from "lucide-react";
import React from "react";

interface ModalConfirmProps {
  handleClose: () => void;
  handleConfirm: () => void;
  message: string;
  title: string;
  isOpen: boolean;
  loading?: boolean;
}

const ModalConfirm = ({
  handleClose,
  handleConfirm,
  message,
  isOpen,
  title,
  loading = false,
}: ModalConfirmProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`
      relative bg-white rounded-2xl shadow-xl 
      w-full max-w-md transform transition-all duration-300 ease-out
      ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
      border border-gray-200
    `}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <TriangleAlert className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            </div>

            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              disabled={loading}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-gray-700 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-2xl">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Batal
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 min-w-[100px] justify-center cursor-pointer"
          >
            {loading && (
              <LoaderIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
            )}
            <span>Lanjutkan</span>
          </button>
        </div>
      </div>
    </div>

  );
};

export default ModalConfirm;
