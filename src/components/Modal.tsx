import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  className?: string; // Zusätzliche Klassen für das Overlay (Hintergrund)
  contentClassName?: string; // Zusätzliche Klassen für die Modal-Box
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  className,
  contentClassName,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        className || ''
      }`}
    >
      <div
        className={`w-full max-w-md rounded-lg p-6 shadow-lg dark:bg-gray-800 ${
          contentClassName || 'bg-white'
        }`}
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        <div className="mt-4 flex justify-end gap-4">
          {cancelText && (
            <Button onClick={onClose} variant="secondary" className="text-sm">
              {cancelText}
            </Button>
          )}
          {confirmText && onConfirm && (
            <Button onClick={onConfirm} variant="danger" className="text-sm">
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
