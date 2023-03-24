import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DraggableThumbnail } from './DraggableThumbnail';

import classes from './FilesDropzone.module.css';

type FilesDropzoneProps = {
  multiple?: boolean;
  values: Record<string, any>;
  setValues: Dispatch<SetStateAction<Record<string, any>>>;
  key_file_array: string;
};

const Uploader: FC<FilesDropzoneProps> = ({ multiple, values, setValues, key_file_array }) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: multiple,
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

  useEffect(() => {
    setValues({ ...values, [key_file_array]: files });
  }, [files]);

  const removeFile = (file: any) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file as never), 1);
    setFiles(newFiles);
    URL.revokeObjectURL(file.preview);
  };

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    const newFiles = [...files];
    newFiles[hoverIndex] = files[dragIndex];
    newFiles[dragIndex] = files[hoverIndex];
    setFiles(newFiles);
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {multiple ? (
          <p className={classes.onHover}>Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos</p>
        ) : (
          <p className={classes.onHover}>Arrastra y suelta un archivo aquí, o haz clic para seleccionar un archivo</p>
        )}
      </div>
      <aside
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 16,
          position: 'relative',
        }}
      >
        {files.map((file: any, index) => (
          <DraggableThumbnail
            isFirst={index === 0}
            isLast={index === files.length - 1}
            key={file?.path}
            file={file}
            index={index}
            moveImage={moveImage}
            removeFile={removeFile}
          />
        ))}
      </aside>
    </section>
  );
};

export default Uploader;
