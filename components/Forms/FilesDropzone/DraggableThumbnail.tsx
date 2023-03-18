import Image from 'next/image';
import { FC } from 'react';

interface DraggableThumbnailProps {
  file: FileWithPreview;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  removeFile: (file: FileWithPreview) => void;
  isFirst: boolean;
  isLast: boolean;
}

interface FileWithPreview extends File {
  preview: string;
}

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

type Position = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';

const deleteButton = {
  position: 'absolute' as Position,
  top: '4px',
  right: '4px',
  background: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const arrowButton = {
  position: 'absolute' as Position,
  background: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

export const DraggableThumbnail: FC<DraggableThumbnailProps> = ({ file, index, moveImage, removeFile, isFirst, isLast }) => {
  const moveLeft = () => {
    moveImage(index, index - 1);
  };

  const moveRight = () => {
    moveImage(index, index + 1);
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 220,
        height: 220,
        padding: 4,
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <div style={thumbInner}>
        <Image
          src={file.preview}
          style={img}
          alt={file.name}
          width={500}
          height={500}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        <button type="button" style={deleteButton} onClick={() => removeFile(file)}>
          X
        </button>
        {!isFirst && (
          <button type="button" style={{ ...arrowButton, left: '4px', bottom: '4px' }} onClick={moveLeft}>
            &lt;
          </button>
        )}
        {!isLast && (
          <button type="button" style={{ ...arrowButton, right: '4px', bottom: '4px' }} onClick={moveRight}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};
