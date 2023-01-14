import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpLoadCom from './components/fileUploadCom';
import { FcPrevious } from 'react-icons/fc';
import PreviewImg from './components/previewImg';
import { UserallState } from './hooks/useContext';

function App() {
  const {
    setActivePrevBox,
    setViewImg,
    activePrebox,
    setActive,
    active,
    data,
    isloading,
  } = UserallState();

  const OnImgSubShow = (url) => {
    setViewImg(url);
    setActivePrevBox(true);
  };

  if (active === true || activePrebox === true) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'scroll';
  }

  return (
    <>
      {active && (
        <div className="imageFileCom">
          <FileUpLoadCom></FileUpLoadCom>
          <button onClick={() => setActive(false)} className="closebtn">
            <FcPrevious></FcPrevious>
          </button>
        </div>
      )}
      <>{activePrebox && <PreviewImg />}</>
      <main className="">
        <ToastContainer position="top-right"></ToastContainer>
        <header>
          <h2 className="Title">Image Gallery app In React JS</h2>
          <div className="uploadBtn">
            <button onClick={() => setActive(true)}>upload File</button>
          </div>
        </header>
        <section className="imageContainer">
          {isloading && (
            <div className="">
              <h4>Loading...</h4>
            </div>
          )}
          <div className="image">
            <div className="imgBox">
              <>
                {data &&
                  data.map((url) => {
                    return (
                      <motion.div layout key={url.id} className="img-wrap">
                        <AnimatePresence>
                          <motion.img
                            onClick={() => OnImgSubShow(url.imageSrc)}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            src={url.imageSrc}
                            alt=""
                          ></motion.img>
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
              </>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
