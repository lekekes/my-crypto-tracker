import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void; // Optionaler Bestätigungs-Handler
  title: string;
  description: string;
  confirmText?: string; // Optionaler Bestätigungstext
  cancelText?: string; // Optionaler Abbrechen-Text
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        <div className="mt-4 flex justify-end gap-4">
          {cancelText && ( // Bedingtes Rendern für den Cancel-Button
            <Button onClick={onClose} variant="secondary" className="text-sm">
              {cancelText}
            </Button>
          )}
          {confirmText &&
            onConfirm && ( // Bedingtes Rendern für den Confirm-Button
              <Button onClick={onConfirm} variant="danger" className="text-sm">
                {confirmText}
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}
