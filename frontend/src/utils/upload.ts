type UploadedPromise<T> = Promise<T> & { abort: () => void };

export const upload = <T>(
  file: File,
  url: string,
  options?: { onProgress?: (progress: number) => void }
): UploadedPromise<T> => {
  const onProgress = options?.onProgress;

  const xml = new XMLHttpRequest();

  xml.open("POST", url);

  xml.responseType = "json";

  const promise = new Promise((resolve, reject) => {
    xml.onload = () => {
      if (xml.status === 200) {
        resolve(xml.response);
      } else {
        reject(xml.response);
      }
    };

    xml.upload.onprogress = (e) => {
      onProgress?.(Math.round((e.total / e.loaded) * 100));
    };

    const myFile = new FormData();
    // TODO exchange 'my_file' on a needed server key
    myFile.append("my_file", file);

    xml.send(myFile);
  }) as UploadedPromise<T>;

  promise.abort = () => xml.abort();

  return promise;
};
