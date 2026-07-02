'use client';

import React, { useCallback, useRef } from 'react';
import { useController, FieldValues } from 'react-hook-form';
import { X } from 'lucide-react';
import { FileUploadFieldProps } from '@/types';
import { cn } from '@/lib/utils';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from './ui/input';

const FileUploader = <T extends FieldValues>({
  control,
  name,
  label,
  acceptTypes,
  disabled,
  icon: Icon,
  placeholder,
  hint,
}: FileUploadFieldProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onChange(file);
      }
    },
    [onChange]
  );

  const onRemove = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      onChange(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [onChange]
  );

  const isUploaded = !!value;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <FormItem className="w-full">
      <FormLabel className="form-label">{label}</FormLabel>
      <FormControl>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={isUploaded ? "File uploaded, click to remove or change" : "Click to upload a file"}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative flex min-h-45 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
            isUploaded
              ? "border-amber-600/30 bg-amber-50"
              : "border-border bg-stone-50 hover:border-amber-500 hover:bg-amber-50/50",
            disabled && "cursor-not-allowed opacity-50"
          )}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <Input
            type="file"
            accept={acceptTypes.join(",")}
            className="hidden"
            ref={inputRef}
            onChange={handleFileChange}
            disabled={disabled}
          />

          {isUploaded ? (
            <div className="relative flex w-full flex-col items-center gap-3 px-6 py-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
              </div>

              <div className="max-w-xs text-center">
                <p className="truncate text-sm font-medium text-foreground">
                  {(value as File).name}
                </p>
                <p className="mt-1 text-xs text-foreground/50">
                  File uploaded successfully
                </p>
              </div>

              <button
                type="button"
                onClick={onRemove}
                onKeyDown={(e) => e.stopPropagation()} 
                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Remove uploaded file"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                <Icon className="h-7 w-7 text-amber-600" aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-medium text-secondary-foreground">{placeholder}</p>
                <p className="mt-1 text-xs text-secondary-foreground/50">{hint}</p>
              </div>

              <span className="rounded-md bg-white px-3 py-1 text-xs font-medium text-secondary-foreground shadow-xs">
                Click to browse
              </span>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FileUploader;