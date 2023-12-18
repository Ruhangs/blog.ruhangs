import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const uploadImage = async (e: any) => {
  const imgFile = e.currentTarget.files[0]

  const formData = new FormData();
  formData.append('file', imgFile);
  formData.append('upload_preset', 'my-uploads');
  // TODO 配置环境变量
  const data = await fetch("https://api.cloudinary.com/v1_1/ducx0mgen/image/upload", {
    method: 'POST',
    body: formData
  }).then(r => r.json());

  return data.secure_url

  // setImageSrc(data.secure_url);
}
