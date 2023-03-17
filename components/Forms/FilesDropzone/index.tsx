import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const FilesDropzone = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <div
      style={{
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box',
      }}
      key={file.name}
    >
      <div style={thumbInner}>
        <Image
          src={file.preview}
          style={img}
          alt={file.name}
          width={300}
          height={300}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <aside
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 16,
        }}
      >
        {thumbs}
      </aside>
    </section>
  );
};

export default FilesDropzone;
