import axios from "axios"
import api from "./api"

export async function uploadBulkStudent(
  file: File,
  onProgress: (progress: number) => void
) {
  try {

    const res = await api.post("/api/upload/admission", {
      fileName: file.name,
      contentType: file.type,
      folderName: "admission",
      size: file.size,
      entity: "ADMISSION"
    })

    const { url, key } = res.data.data

    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type
      },
      onUploadProgress: (event) => {
        const percent = Math.round(
          (event.loaded * 100) / (event.total || 1)
        )

        onProgress(percent)
      }
    })

    return key

  } catch (error: any) {
    console.error("Upload failed", error)
    console.log("Server error:", error.response?.data)
    throw error
  }
}