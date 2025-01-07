"use client"

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
const IMAGE_FORMATS = [
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPEG' },
  { value: 'webp', label: 'WebP' },
  { value: 'gif', label: 'GIF' },
  { value: 'bmp', label: 'BMP' },
  { value: 'tiff', label: 'TIFF' },
  { value: 'ico', label: 'ICO' },
  { value: 'avif', label: 'AVIF' }
];

const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputFormat, setInputFormat] = useState('png');
  const [outputFormat, setOutputFormat] = useState('jpeg');
  const [isConverting, setIsConverting] = useState(false);

  const detectAndSetInputFormat = (file: File) => {
    const type = file.type.split('/')[1];
    // Normalize the type to match our format values
    const normalizedType = type === 'jpg' ? 'jpeg' : type.toLowerCase();
    if (IMAGE_FORMATS.some(format => format.value === normalizedType)) {
      console.log('Setting input format to:', normalizedType);
      setInputFormat(normalizedType);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log('File selected:', file.name);
      setSelectedFile(file);
      detectAndSetInputFormat(file);
      toast.success('Image uploaded successfully!');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.tiff', '.ico', '.avif']
    },
    multiple: false
  });

  // const convertAndDownload = async () => {
  //   if (!selectedFile) {
  //     toast.error('Please select an image first');
  //     return;
  //   }

  //   setIsConverting(true);
  //   console.log('Converting image from', inputFormat, 'to', outputFormat);

  //   try {
  //     // Create a canvas element to perform the conversion
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');
  //     const img = new Image();

  //     // Create a promise to handle the image loading
  //     await new Promise((resolve, reject) => {
  //       img.onload = () => {
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         ctx?.drawImage(img, 0, 0);
  //         resolve(null);
  //       };
  //       img.onerror = () => reject(new Error('Failed to load image'));
  //       img.src = URL.createObjectURL(selectedFile);
  //     });

  //     // Convert the canvas to a blob of the desired format
  //     const blob = await new Promise<Blob>((resolve, reject) => {
  //       canvas.toBlob(
  //         (blob) => {
  //           if (blob) resolve(blob);
  //           else reject(new Error('Failed to convert image'));
  //         },
  //         `image/${outputFormat}`,
  //         0.95
  //       );
  //     });

  //     // Create a download link and trigger the download
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `converted-image.${outputFormat}`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url);

  //     toast.success('Image converted and downloaded successfully!');
  //   } catch (error) {
  //     console.error('Error converting image:', error);
  //     toast.error('Failed to convert image. Please try again.');
  //   } finally {
  //     setIsConverting(false);
  //   }
  // };


  const convertAndDownload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }
  
    setIsConverting(true);
    console.log('Converting image from', inputFormat, 'to', outputFormat);
  
    try {
      // Create a canvas element to perform the conversion
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
  
      // Create a promise to handle the image loading
      await new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          resolve(null);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(selectedFile);
      });
  
      // Convert the canvas to a blob of the desired format
      const formatType = `image/${outputFormat}`;
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to convert image'));
          },
          formatType,
          0.95
        );
      });
  
      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted-image.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  
      toast.success('Image converted and downloaded successfully!');
    } catch (error) {
      console.error('Error converting image:', error);
      toast.error('Failed to convert image. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Image Converter</h1>
          <p className="text-muted-foreground">Convert your images to any format</p>
        </div>

        <div
          {...getRootProps()}
          className={`dropzone bg-gray-200 border-black border border-dashed p-5 rounded ${isDragActive ? 'dragging' : ''} cursor-pointer`}
        >
          <Input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-4 ">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              {selectedFile ? (
                <p className="font-medium">{selectedFile.name}</p>
              ) : (
                <>
                  <p className="font-medium">Drag & drop your image here</p>
                  <p className="text-sm text-muted-foreground">or click to select</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Input Format</Label>
            <Select value={inputFormat} onValueChange={setInputFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {IMAGE_FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Output Format</Label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {IMAGE_FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={convertAndDownload}
          disabled={!selectedFile || isConverting}
        >
          {isConverting ? (
            'Converting...'
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Convert & Download
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ImageConverter;