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
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [onChange]
  );

  const isUploaded = !!value;

  return (
    <FormItem className="w-full">
      <FormLabel className="form-label">{label}</FormLabel>
      <FormControl>
        <div
          className={cn(
            "relative flex min-h-[180px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300",
            isUploaded
              ? "border-amber-600/30 bg-amber-50"
              : "border-stone-300 bg-stone-50 hover:border-amber-500 hover:bg-amber-50/50",
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
                <Icon className="h-7 w-7 text-green-600" />
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
                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm transition hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                <Icon className="h-7 w-7 text-amber-700" />
              </div>

              <div>
                <p className="text-sm font-medium text-stone-900">
                  {placeholder}
                </p>

                <p className="mt-1 text-xs text-stone-500">
                  {hint}
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600 shadow-sm">
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