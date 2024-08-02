import { Injectable, signal } from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  uploadProgress = signal<number>(0);
  photoUrl!: string;
  async uploadFileToFireStoreBucket(file: File): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            this.uploadProgress.set(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.error('Upload failed', error);
            reject(error);
          },
          async () => {
            try {
              this.photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            } catch (error) {
              reject(error);
            }
          }
        );
      });
      this.uploadProgress.set(0)
      return this.photoUrl;
    } catch (error) {
      console.error('Failed to upload file', error);
      return '';
    }
  }

  async deleteFileFromFireStoreBucket(filePath: string): Promise<void> {
    const storage = getStorage();
    const fileRef = ref(storage, filePath);

    try {
      await deleteObject(fileRef);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Failed to delete file', error);
      throw error;
    }
  }
}
