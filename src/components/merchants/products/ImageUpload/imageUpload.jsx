import React, { useState } from 'react';
import Button from '../../../button/button';
import { toast } from 'react-toastify';
import { useCreateMerchantProductImageRequest } from '../../../../api/merchants/products';

const ImageUpload = ({ id }) => {
  const { mutate: uploadImageRequest } = useCreateMerchantProductImageRequest();

  const [file, setFile] = useState();
  const [fileUpload, setFileUpload] = useState();
  const [files, setFiles] = useState([]);

  const handleImageUpload = () => {
    uploadImageRequest({ id, files });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(files);

    const imgFile = files?.map((file) => URL.createObjectURL(file));

    console.log(imgFile);
    // if (e?.target?.files[0]?.type.includes('image')) {
    //   // setFile(URL.createObjectURL(e?.target?.files[0]));
    //   const newFile = files.map((prevFile) => [...prevFile, file]);
    //   console.log(newFile);
    //   setFiles({ newFile });
    //   setFileUpload(e?.target?.files[0]);
    // } else {
    //   toast.error('invalid file type');
    // }
  };
  const convertImage = (file) => URL.createObjectURL(file);
  return (
    <section className="grid grid-cols-12 w-[600px] min-h-[400px] gap-2 ">
      <aside className="relative col-span-6 border min-h-[100px] max-h-[240px] flex justify-center items-center  rounded-md overflow-hidden">
        <div className="bg-red-400 h-full">
          {/* {file && <img src={file} alt="product " className="w-full h-full" />} */}
          {/* <img src={file} alt="product " className="w-full h-full" /> */}
          {/* {files.length > 0 && files?.map((file, id) => <p> hi </p>)} */}
          <p className="absolute uppercase text-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-[#002d62] rounded-xl py-2 px-6 my-2">
            Edit Image
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 px-6"
            />
          </p>
        </div>
      </aside>

      <div className="col-span-12 row-start-3 mt-2">
        <Button text={'upload'} handleClick={handleImageUpload} />
      </div>
    </section>
  );
};

export default ImageUpload;
