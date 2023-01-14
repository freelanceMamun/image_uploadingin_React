import { useState, useEffect } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { FcImageFile, FcDocument } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { storage, firestore } from '../Firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

function FileUpLoadCom() {
  const [upfile, setUpFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);

  const [fileLogo, setfileLogo] = useState(
    <FcDocument style={{ fontSize: '35px' }}></FcDocument>
  );
  const imageType = ['image/png', 'image/jpg', 'image/jpeg'];

  const OnChangeUpFiles = (files) => {
    // setInput File
    setUpFile(files);
    // imageFile Select
    if (imageType.includes(files.type)) {
      setImage(files);
      setfileLogo(<FcImageFile style={{ fontSize: '35px' }}></FcImageFile>);
    }
  };

  useEffect(() => {
    /// imageFile Uploading to Firebase storage
    const imageUploading = () => {
      const imageStorage = ref(storage, `image/${Date.now()}-${image.name}`);
      const uploadImgTask = uploadBytesResumable(imageStorage, image);
      uploadImgTask.on(
        'state_changed',
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(uploadProgress);
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadImgTask.snapshot.ref).then((downloadUrl) => {
            setImageUrl(downloadUrl);
            toast.success('Image uploaded succesfully!');
          });
        }
      );
    };
    if (image) {
      imageUploading();
    }
  }, [image]);

  useEffect(() => {
    /// add fireStore image url
    const imageUrlUploading = async () => {
      try {
        await addDoc(collection(firestore, 'Image'), {
          imageSrc: imageUrl,
          TimeStamp: serverTimestamp(),
        });
        toast.success('Image upload succesfully Firestore!');
      } catch (error) {
        return toast.error(error.message);
      }
    };
    imageUrl && imageUrlUploading();

    /// audio url function call is true
  }, [imageUrl]);

  return (
    <motion.div
      animate={{
        opacity: 1,
        y: '15rem',
        x: '0rem',
      }}
      initial={{
        opacity: 0,
      }}
      className="wrapper"
    >
      <header>File Upoloader React JS</header>
      <form action="#">
        <label>
          <input
            type="file"
            onChange={(e) => OnChangeUpFiles(e.target.files[0])}
            hidden
            className="file-input"
          />
          <MdCloudUpload
            style={{
              color: '#6990f2',
              fontSize: '50px',
            }}
          ></MdCloudUpload>

          <p>Browse File to Upload</p>
        </label>
      </form>
      <section className="progress-area">
        {upfile && (
          <li className="row">
            {/* <FcImageFile
            style={{
              fontSize: '30px',
            }}
          ></FcImageFile> */}
            {fileLogo && fileLogo}
            <div className="content">
              <div className="details">
                <span className="name">{upfile.name}</span>
                <span className="percent">{progress.toFixed(1)}%</span>
              </div>
              <div className="progress-bar">
                <div
                  style={{
                    width: progress + '%',
                  }}
                  className="progress"
                ></div>
              </div>
            </div>
          </li>
        )}
      </section>
    </motion.div>
  );
}

export default FileUpLoadCom;
