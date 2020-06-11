import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import { Container } from './styles';

interface DropzonePros {
  onFileOploaded: (file: File) => void;
}

const Dropzone: React.FC<DropzonePros> = ({ onFileOploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0] as File;

    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileOploaded(file);
  }, [onFileOploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
      {selectedFileUrl
        ? <img src={selectedFileUrl} alt='Thumbnail' />
        : (
          <p>
            <FiUpload />
        Imagem do estabelecimento.
          </p>
        )
      }
    </Container>
  )
}

export default Dropzone;
