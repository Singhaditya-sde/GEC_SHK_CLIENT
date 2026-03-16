import {
  UploadCloud,
  Rocket,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  X,
  ShieldCheck,
} from 'lucide-react'

import { useRef, useState } from 'react'
import { BatchCard } from '../../admin_components/batch/BatchCard'
import { ToggleCard } from '@/components/ui common/ToggleCard'
import { uploadBulkStudent } from '@/services/upload'
import { Spinner } from '@/components/ui common/Spinner'

const CardStats = [
  {
    id: 'total_students',
    icon: FileText,
    iconColor: '#0B3D93',
    iconBgColor: 'rgba(11, 61, 147, 0.1)',
    title: 'Total Students',
    value: '2,204',
  },
  {
    id: 'success_records',
    icon: CheckCircle,
    iconColor: '#059669',
    iconBgColor: 'rgba(5, 150, 105, 0.1)',
    title: 'Successfully Created',
    value: 40,
  },
  {
    id: 'failed_records',
    icon: XCircle,
    iconColor: '#E11D48',
    iconBgColor: 'rgba(225, 29, 72, 0.1)',
    title: 'Failed Records',
    value: 5,
  },
]

export function AdminBulkUploadPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const sampleXLSXUrl = import.meta.env.VITE_SAMPLE_XLSX_URL

  function handleFileSelect(files: FileList | null) {
    if (!files || files.length === 0) return

    const selected = files[0]

    if (!selected.name.endsWith('.xlsx')) {
      alert('Only XLSX files are supported.')
      return
    }

    if (selected.size > 10 * 1024 * 1024) {
      alert('Max file size is 10MB.')
      return
    }

    setFile(selected)
  }

  function removeFile() {
    setFile(null)
    setProgress(0)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    handleFileSelect(e.dataTransfer.files)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  async function handleUpload() {
    if (!file) return

    try {
      setUploading(true)
      setErrorMessage('')
      setSuccessMessage('')

      // frist get the Request presigned URL
      setProgress(10)

      const key = await uploadBulkStudent(file, (progress) => {
        const mappedProgress = 20 + Math.round((progress / 100) * 75)
        setProgress(mappedProgress)
      })

      console.log('Uploaded file key:', key)

      setProgress(100)

      setSuccessMessage('File uploaded successfully. Processing will begin shortly.')

      // reset after few seconds
      setTimeout(() => {
        setProgress(0)
        setSuccessMessage('')
      }, 4000)
    } catch (error: any) {
      console.error('Upload failed', error)

      const message = error.response?.data?.message || 'File upload failed. Please try again.'

      setErrorMessage(message)

      setProgress(0)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <div className="p-5">
        <div className="pb-5">
          <h1 className="text-2xl font-semibold text-[#0F172A]">Bulk Student Upload</h1>
          <p className="text-sm text-[#64748B]">
            Efficiently register multiple students by uploading a standardized XLSX file.
          </p>
        </div>

        <div className="flex justify-between">
          <div className="bg-white p-6 mr-5 w-full rounded-xl shadow-sm">
            {/* Drop the files here  */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-[#64748B] bg-[#0B3D93]/10 rounded-2xl py-20 text-center flex flex-col items-center justify-center"
            >
              <div className="bg-slate-100 p-5 rounded-full mb-4">
                <UploadCloud size={28} className="text-[#0F172A]" />
              </div>

              <p className="font-semibold text-lg text-[#0F172A]">
                Drag and drop your XLSX file here
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Only .xlsx files are supported (Max 10MB)
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-4 px-5 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-100 transition"
              >
                Browse File
              </button>

              <input
                type="file"
                accept=".xlsx"
                ref={inputRef}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
            </div>

            {/* selected file will be showed */}
            {file && (
              <div className="mt-4 flex justify-between items-center bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-slate-700">
                <div className="flex flex-col">
                  <span className="font-semibold">{file.name}</span>
                  <span className="text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                {!uploading && (
                  <button
                    onClick={removeFile}
                    className="text-slate-400 hover:text-red-500 transition"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            )}

            {/* progress bar */}
            {uploading && (
              <div className="mt-4">
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0B3D93] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 mt-2">Uploading file... {progress}%</p>
              </div>
            )}

            {/* success message */}
            {successMessage && (
              <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                <CheckCircle size={18} />
                <span className="text-sm font-medium">{successMessage}</span>
              </div>
            )}

            {/* error message */}
            {errorMessage && (
              <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                <XCircle size={18} />
                <span className="text-sm font-medium">{errorMessage}</span>
              </div>
            )}

            {/* auto password toggle */}
            <div className="mt-5 gap-5">
              <ToggleCard
                label="Auto-generated Default Password"
                description="Automatically creates passwords for new accounts (e.g., GEC@2024)"
                checked={true}
                icon={ShieldCheck}
                disabled={true}
                onChange={() => {}}
              />

              {/* downloading and uploading button */}
              <div className="mt-5 flex flex-col gap-4">
                <button
                  onClick={() => window.open(sampleXLSXUrl)}
                  className="px-5 py-3 text-[#0B3D93] border text-sm font-medium rounded-xl flex justify-center items-center gap-3 cursor-pointer"
                >
                  <Download size={16} />
                  Download Sample XLSX Format
                </button>

                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="px-5 py-3 bg-[#0B3D93] text-white flex justify-center border text-sm rounded-xl items-center gap-3 font-semibold disabled:opacity-50 cursor-pointer"
                >
                  <Rocket size={16} />
                  {uploading
                    ? `${(<Spinner />)}Uploading ${progress}%`
                    : 'Upload & Process Records'}
                </button>
              </div>
            </div>
          </div>

          {/* cards stats */}
          <div className="flex flex-col justify-between gap-5">
            {CardStats.map(({ id, icon, iconColor, iconBgColor, title, value }) => (
              <BatchCard
                key={id}
                icon={icon}
                iconColor={iconColor}
                iconBgColor={iconBgColor}
                title={title}
                value={value}
                className="py-9 "
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
